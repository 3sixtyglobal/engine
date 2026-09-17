// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AuthHeaderProcessor,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@twin.org/api-auth-entity-storage-service";
import { SocketRouteProcessorFactory } from "@twin.org/api-models";
import {
	ContextIdProcessor,
	LoggingProcessor,
	SocketRouteProcessor,
	StaticContextIdProcessor
} from "@twin.org/api-processors";
import {
	SingleTenantProcessor,
	TenantOverrideProcessor,
	TenantProcessor
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
import type { SocketRouteProcessorConfig } from "../models/config/socketRouteProcessorConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { SocketRouteProcessorType } from "../models/types/socketRouteProcessorType.js";

/**
 * Initialise the socket route processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseSocketRouteProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: SocketRouteProcessorConfig
): EngineTypeInitialiserReturn<SocketRouteProcessorConfig, typeof SocketRouteProcessorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === SocketRouteProcessorType.AuthHeader) {
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
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						tenantAdminComponentType:
							engineCore.getRegisteredInstanceTypeOptional("tenantAdminComponent")
					},
					{
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(AuthHeaderProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.Logging) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new LoggingProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(LoggingProcessor)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(LoggingProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.ContextId) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new ContextIdProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(ContextIdProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.StaticContextId) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new StaticContextIdProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(StaticContextIdProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.SocketRoute) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new SocketRouteProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(SocketRouteProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.Tenant) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TenantProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						tenantAdminComponentType: engineCore.getRegisteredInstanceType("tenantAdminComponent"),
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TenantProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.SingleTenant) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new SingleTenantProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(SingleTenantProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.TenantOverride) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TenantOverrideProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						tenantAdminComponentType: engineCore.getRegisteredInstanceType("tenantAdminComponent"),
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TenantOverrideProcessor);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: SocketRouteProcessorFactory
	};
}
