// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	EntityStorageIdentityProfileConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityProfile
} from "@twin.org/identity-connector-entity-storage";
import {
	IdentityProfileConnectorFactory,
	type IIdentityProfileComponent,
	type IIdentityProfileConnector
} from "@twin.org/identity-models";
import { IdentityProfileRestClient } from "@twin.org/identity-rest-client";
import { IdentityProfileService } from "@twin.org/identity-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { IdentityProfileComponentConfig } from "../models/config/identityProfileComponentConfig.js";
import type { IdentityProfileConnectorConfig } from "../models/config/identityProfileConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { IdentityProfileComponentType } from "../models/types/identityProfileComponentType.js";
import { IdentityProfileConnectorType } from "../models/types/identityProfileConnectorType.js";

/**
 * Initialise the identity profile connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseIdentityProfileConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityProfileConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof IdentityProfileConnectorFactory;
	component?: IComponent;
}> {
	let connector: IIdentityProfileConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === IdentityProfileConnectorType.EntityStorage) {
		initSchemaIdentityStorage({ includeDocument: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.profileEntityStorageType,
			nameof<IdentityProfile>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		connector = new EntityStorageIdentityProfileConnector(instanceConfig.options);
		instanceType = EntityStorageIdentityProfileConnector.NAMESPACE;
	}

	return {
		component: connector,
		instanceType,
		factory: IdentityProfileConnectorFactory
	};
}

/**
 * Initialise the identity profile component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseIdentityProfileComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityProfileComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IIdentityProfileComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === IdentityProfileComponentType.Service) {
		component = new IdentityProfileService({
			profileEntityConnectorType: engineCore.getRegisteredInstanceType("identityProfileConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(IdentityProfileService);
	} else if (instanceConfig.type === IdentityProfileComponentType.RestClient) {
		component = new IdentityProfileRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(IdentityProfileRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
