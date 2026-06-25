// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageTelemetryConnector,
	initSchema,
	type TelemetryMetric,
	type TelemetryMetricValue
} from "@twin.org/telemetry-connector-entity-storage";
import { OpenTelemetryTelemetryConnector } from "@twin.org/telemetry-connector-opentelemetry";
import { TelemetryConnectorFactory } from "@twin.org/telemetry-models";
import { TelemetryRestClient } from "@twin.org/telemetry-rest-client";
import { TelemetryService } from "@twin.org/telemetry-service";
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
						loggingComponentType: engineCore.getRegisteredLoggerType(
							nameof(EntityStorageTelemetryConnector)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageTelemetryConnector.NAMESPACE;
	} else if (instanceConfig.type === TelemetryConnectorType.OpenTelemetry) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			// OpenTelemetry connector uses the entity storage internally so we need to initialise it here as well
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
			return new OpenTelemetryTelemetryConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(
							nameof(OpenTelemetryTelemetryConnector)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = OpenTelemetryTelemetryConnector.NAMESPACE;
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
