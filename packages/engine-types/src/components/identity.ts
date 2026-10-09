// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@3sixty/core";
import type { IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import {
	EntityStorageIdentityConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityDocument
} from "@3sixty/identity-connector-entity-storage";
import { IotaIdentityConnector } from "@3sixty/identity-connector-iota";
import { IdentityConnectorFactory } from "@3sixty/identity-models";
import { IdentityRestClient } from "@3sixty/identity-rest-client";
import { IdentityService } from "@3sixty/identity-service";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { IdentityComponentConfig } from "../models/config/identityComponentConfig.js";
import type { IdentityConnectorConfig } from "../models/config/identityConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { IdentityComponentType } from "../models/types/identityComponentType.js";
import { IdentityConnectorType } from "../models/types/identityConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the identity connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseIdentityConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof IdentityConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === IdentityConnectorType.Iota) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
				engineCore.getConfig(),
				"dltConfig",
				DltConfigType.Iota
			);
			return new IotaIdentityConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						config: dltConfig?.options?.config
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = IotaIdentityConnector.NAMESPACE;
	} else if (instanceConfig.type === IdentityConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaIdentityStorage({ includeProfile: false });
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.didDocumentEntityStorageType,
				nameof<IdentityDocument>(),
				[]
			);
			return new EntityStorageIdentityConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector") },
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageIdentityConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
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
export function initialiseIdentityComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === IdentityComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IdentityService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(IdentityService)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(IdentityService);
	} else if (instanceConfig.type === IdentityComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IdentityRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(IdentityRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
