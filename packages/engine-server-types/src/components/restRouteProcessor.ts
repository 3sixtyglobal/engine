// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AuthHeaderProcessor,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@3sixty/api-auth-entity-storage-service";
import { RestRouteProcessorFactory } from "@3sixty/api-models";
import {
	ContextIdProcessor,
	LoggingProcessor,
	RestRouteProcessor,
	StaticContextIdProcessor
} from "@3sixty/api-processors";
import {
	TenantProcessor,
	SingleTenantProcessor,
	TenantOverrideProcessor
} from "@3sixty/api-tenant-processor";
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import type { IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper, initialiseEntityStorageConnector } from "@3sixty/engine-types";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { MetricsRouteProcessor } from "@3sixty/telemetry-processors";
import { TracingRouteProcessor } from "@3sixty/tracing-processors";
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
	} else if (instanceConfig.type === RestRouteProcessorType.Logging) {
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
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(RestRouteProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.Tenant) {
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
	} else if (instanceConfig.type === RestRouteProcessorType.SingleTenant) {
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
	} else if (instanceConfig.type === RestRouteProcessorType.TenantOverride) {
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
	} else if (instanceConfig.type === RestRouteProcessorType.Metrics) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MetricsRouteProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(MetricsRouteProcessor)
						),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(MetricsRouteProcessor)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(MetricsRouteProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.Tracing) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TracingRouteProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						tracingComponentType: engineCore.getRegisteredSilencedType(
							"tracing",
							nameof(TracingRouteProcessor)
						),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(TracingRouteProcessor)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TracingRouteProcessor);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: RestRouteProcessorFactory
	};
}
