// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	EntityStorageIdentityConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityDocument
} from "@twin.org/identity-connector-entity-storage";
import { IotaIdentityConnector } from "@twin.org/identity-connector-iota";
import {
	IdentityConnectorFactory,
	type IIdentityComponent,
	type IIdentityConnector
} from "@twin.org/identity-models";
import { IdentityClient } from "@twin.org/identity-rest-client";
import { IdentityService } from "@twin.org/identity-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { DltConfig } from "../models/config/dltConfig";
import type { IdentityComponentConfig } from "../models/config/identityComponentConfig";
import type { IdentityConnectorConfig } from "../models/config/identityConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DltConfigType } from "../models/types/dltConfigType";
import { IdentityComponentType } from "../models/types/identityComponentType";
import { IdentityConnectorType } from "../models/types/identityConnectorType";
import { EngineTypeHelper } from "../utils/engineTypeHelper";

/**
 * Initialise the identity connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseIdentityConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof IdentityConnectorFactory;
	component?: IComponent;
}> {
	let component: IIdentityConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === IdentityConnectorType.Iota) {
		const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
			engineCore.getConfig(),
			"dltConfig",
			DltConfigType.Iota
		);
		component = new IotaIdentityConnector({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaIdentityConnector.NAMESPACE;
	} else if (instanceConfig.type === IdentityConnectorType.EntityStorage) {
		initSchemaIdentityStorage({ includeProfile: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.didDocumentEntityStorageType,
			nameof<IdentityDocument>()
		);
		component = new EntityStorageIdentityConnector({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			...instanceConfig.options
		});
		instanceType = EntityStorageIdentityConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: IdentityConnectorFactory
	};
}

/**
 * Initialise the identity component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseIdentityComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IIdentityComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === IdentityComponentType.Service) {
		component = new IdentityService(instanceConfig.options);
		instanceType = nameofKebabCase(IdentityService);
	} else if (instanceConfig.type === IdentityComponentType.RestClient) {
		component = new IdentityClient(instanceConfig.options);
		instanceType = nameofKebabCase(IdentityClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
