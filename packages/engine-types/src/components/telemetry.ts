// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import { ComponentFactory, type IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import {
	EntityStorageTelemetryConnector,
	initSchema,
	type TelemetryMetric,
	type TelemetryMetricValue
} from "@3sixty/telemetry-connector-entity-storage";
import { OpenTelemetryTelemetryConnector } from "@3sixty/telemetry-connector-opentelemetry";
import {
	MultiTelemetryConnector,
	SilentTelemetryConnector,
	TelemetryConnectorFactory
} from "@3sixty/telemetry-models";
import { TelemetryRestClient } from "@3sixty/telemetry-rest-client";
import { TelemetryService } from "@3sixty/telemetry-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { TelemetryComponentConfig } from "../models/config/telemetryComponentConfig.js";
import type { TelemetryConnectorConfig } from "../models/config/telemetryConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TelemetryComponentType } from "../models/types/telemetryComponentType.js";
import { TelemetryConnectorType } from "../models/types/telemetryConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a telemetry connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTelemetryConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TelemetryConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof TelemetryConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TelemetryConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.telemetryMetricStorageConnectorType,
				nameof<TelemetryMetric>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.telemetryMetricValueStorageConnectorType,
				nameof<TelemetryMetricValue>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageTelemetryConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(EntityStorageTelemetryConnector)
						),
						backgroundTaskComponentType:
							engineCore.getRegisteredInstanceTypeOptional("backgroundTaskComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageTelemetryConnector.NAMESPACE;
	} else if (instanceConfig.type === TelemetryConnectorType.OpenTelemetry) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new OpenTelemetryTelemetryConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = OpenTelemetryTelemetryConnector.NAMESPACE;
	} else if (instanceConfig.type === TelemetryConnectorType.Multi) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MultiTelemetryConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = MultiTelemetryConnector.NAMESPACE;
	} else if (instanceConfig.type === TelemetryConnectorType.Silent) {
		createComponent = (createConfig: typeof instanceConfig) => new SilentTelemetryConnector();
		instanceTypeName = SilentTelemetryConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: TelemetryConnectorFactory
	};
}

/**
 * Initialise the telemetry component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTelemetryComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TelemetryComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TelemetryComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TelemetryService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						telemetryConnectorType: engineCore.getRegisteredInstanceType("telemetryConnector"),
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TelemetryService);
	} else if (instanceConfig.type === TelemetryComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TelemetryRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(TelemetryRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
