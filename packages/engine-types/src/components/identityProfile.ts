// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import type { IComponent } from "@3sixty/core";
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import {
	EntityStorageIdentityProfileConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityProfile
} from "@3sixty/identity-connector-entity-storage";
import { IdentityProfileConnectorFactory } from "@3sixty/identity-models";
import { IdentityProfileRestClient } from "@3sixty/identity-rest-client";
import { IdentityProfileService } from "@3sixty/identity-service";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { IdentityProfileComponentConfig } from "../models/config/identityProfileComponentConfig.js";
import type { IdentityProfileConnectorConfig } from "../models/config/identityProfileConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { IdentityProfileComponentType } from "../models/types/identityProfileComponentType.js";
import { IdentityProfileConnectorType } from "../models/types/identityProfileConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the identity profile connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseIdentityProfileConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityProfileConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof IdentityProfileConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === IdentityProfileConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaIdentityStorage({ includeDocument: false });
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.profileEntityStorageType,
				nameof<IdentityProfile>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageIdentityProfileConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageIdentityProfileConnector.NAMESPACE;
	}

	return {
		createComponent,
		instanceTypeName,
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
export function initialiseIdentityProfileComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityProfileComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === IdentityProfileComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IdentityProfileService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						profileEntityConnectorType: engineCore.getRegisteredInstanceType(
							"identityProfileConnector"
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(IdentityProfileService);
	} else if (instanceConfig.type === IdentityProfileComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IdentityProfileRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(IdentityProfileRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
