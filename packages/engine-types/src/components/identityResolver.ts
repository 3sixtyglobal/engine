// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	EntityStorageIdentityResolverConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityDocument
} from "@twin.org/identity-connector-entity-storage";
import { IotaIdentityResolverConnector } from "@twin.org/identity-connector-iota";
import { UniversalResolverConnector } from "@twin.org/identity-connector-universal";
import {
	IdentityResolverConnectorFactory,
	type IIdentityResolverComponent,
	type IIdentityResolverConnector
} from "@twin.org/identity-models";
import { IdentityResolverRestClient } from "@twin.org/identity-rest-client";
import { IdentityResolverService } from "@twin.org/identity-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { IdentityResolverComponentConfig } from "../models/config/identityResolverComponentConfig.js";
import type { IdentityResolverConnectorConfig } from "../models/config/identityResolverConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { IdentityResolverComponentType } from "../models/types/identityResolverComponentType.js";
import { IdentityResolverConnectorType } from "../models/types/identityResolverConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the identity resolver connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseIdentityResolverConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityResolverConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof IdentityResolverConnectorFactory;
	component?: IComponent;
}> {
	let component: IIdentityResolverConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === IdentityResolverConnectorType.Iota) {
		const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
			engineCore.getConfig(),
			"dltConfig",
			DltConfigType.Iota
		);
		component = new IotaIdentityResolverConnector({
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaIdentityResolverConnector.NAMESPACE;
	} else if (instanceConfig.type === IdentityResolverConnectorType.EntityStorage) {
		initSchemaIdentityStorage({ includeProfile: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.didDocumentEntityStorageType,
			nameof<IdentityDocument>(),
			[]
		);
		component = new EntityStorageIdentityResolverConnector({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			...instanceConfig.options
		});
		instanceType = EntityStorageIdentityResolverConnector.NAMESPACE;
	} else if (instanceConfig.type === IdentityResolverConnectorType.Universal) {
		component = new UniversalResolverConnector({
			...instanceConfig.options
		});
		instanceType = UniversalResolverConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: IdentityResolverConnectorFactory
	};
}

/**
 * Initialise the identity resolver component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseIdentityResolverComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityResolverComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IIdentityResolverComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === IdentityResolverComponentType.Service) {
		const defaultIdentityResolverType = engineCore.getRegisteredInstanceType(
			"identityResolverConnector"
		);

		component = new IdentityResolverService({
			fallbackResolverConnectorType:
				defaultIdentityResolverType !== IdentityResolverConnectorType.Universal
					? IdentityResolverConnectorType.Universal
					: undefined,
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(IdentityResolverService);
	} else if (instanceConfig.type === IdentityResolverComponentType.RestClient) {
		component = new IdentityResolverRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(IdentityResolverRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
