// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AuthHeaderProcessor,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@twin.org/api-auth-entity-storage-service";
import { TenantOverrideProcessor } from "@twin.org/api-auth-service";
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
	SingleTenantProcessor,
	type Tenant
} from "@twin.org/api-tenant-processor";
import { AuthorizationRouteProcessor } from "@twin.org/authorization-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { EngineTypeHelper, initialiseEntityStorageConnector } from "@twin.org/engine-types";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { MetricsRouteProcessor } from "@twin.org/telemetry-processors";
import { TracingRouteProcessor } from "@twin.org/tracing-processors";
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
		createComponent = (createConfig: typeof instanceConfig) => {
			initTenantStorage(engineCore, context, createConfig?.options?.tenantEntityStorageType);
			return new TenantProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		};
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
						authorizationComponentType:
							engineCore.getRegisteredInstanceType("authorizationComponent"),
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
	} else if (instanceConfig.type === RestRouteProcessorType.Authorization) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AuthorizationRouteProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						authorizationComponentType:
							engineCore.getRegisteredInstanceType("authorizationComponent"),
						config: {
							includeErrorStack: context.config.debug
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(AuthorizationRouteProcessor);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: RestRouteProcessorFactory
	};
}

/**
 * Initialise the tenant storage.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param tenantEntityStorageType The tenant entity storage type.
 */
export function initTenantStorage(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	tenantEntityStorageType?: string
): void {
	initSchemaTenantProcessor();
	initialiseEntityStorageConnector(
		engineCore,
		context,
		tenantEntityStorageType,
		nameof<Tenant>(),
		ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
			ContextIdKeys.Node,
			ContextIdKeys.Tenant
		])
	);
}
