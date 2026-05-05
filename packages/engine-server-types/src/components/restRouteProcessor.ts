// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AuthHeaderProcessor,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@twin.org/api-auth-entity-storage-service";
import { RestRouteProcessorFactory } from "@twin.org/api-models";
import {
	ContextIdProcessor,
	LoggingProcessor,
	RestRouteProcessor,
	StaticContextIdProcessor
} from "@twin.org/api-processors";
import {
	initSchema as initSchemaTenantProcessor,
	TenantProcessor,
	type Tenant
} from "@twin.org/api-tenant-processor";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { EngineTypeHelper, initialiseEntityStorageConnector } from "@twin.org/engine-types";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { RestRouteProcessorConfig } from "../models/config/restRouteProcessorConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { RestRouteProcessorType } from "../models/types/restRouteProcessorType.js";

/**
 * Initialise the rest route processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRestRouteProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: RestRouteProcessorConfig
): EngineTypeInitialiserReturn<RestRouteProcessorConfig, typeof RestRouteProcessorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RestRouteProcessorType.AuthHeader) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaAuthEntityStorage();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.userEntityStorageType,
				nameof<AuthenticationUser>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);

			return new AuthHeaderProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(AuthHeaderProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.Logging) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new LoggingProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(LoggingProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.ContextId) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new ContextIdProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(ContextIdProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.StaticContextId) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new StaticContextIdProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(StaticContextIdProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.RestRoute) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new RestRouteProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(RestRouteProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.Tenant) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaTenantProcessor();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.tenantEntityStorageType,
				nameof<Tenant>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new TenantProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						urlTransformerComponentType:
							engineCore.getRegisteredInstanceType("urlTransformerComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(TenantProcessor);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: RestRouteProcessorFactory
	};
}
