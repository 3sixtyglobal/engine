// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { ConsoleLoggingConnector } from "@twin.org/logging-connector-console";
import {
	EntityStorageLoggingConnector,
	initSchema as initSchemaLogging,
	type LogEntry
} from "@twin.org/logging-connector-entity-storage";
import { FileLoggingConnector } from "@twin.org/logging-connector-file";
import { OpenTelemetryLoggingConnector } from "@twin.org/logging-connector-opentelemetry";
import { LoggingConnectorFactory, MultiLoggingConnector } from "@twin.org/logging-models";
import { LoggingRestClient } from "@twin.org/logging-rest-client";
import { LoggingService } from "@twin.org/logging-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { LoggingComponentConfig } from "../models/config/loggingComponentConfig.js";
import type { LoggingConnectorConfig } from "../models/config/loggingConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { LoggingComponentType } from "../models/types/loggingComponentType.js";
import { LoggingConnectorType } from "../models/types/loggingConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the logging connector.
 * @param engineCore The engine core.
 * @param context The engine core context.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseLoggingConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: LoggingConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof LoggingConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === LoggingConnectorType.Console) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new ConsoleLoggingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = ConsoleLoggingConnector.NAMESPACE;
	} else if (instanceConfig.type === LoggingConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaLogging();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.logEntryStorageConnectorType,
				nameof<LogEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageLoggingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageLoggingConnector.NAMESPACE;
	} else if (instanceConfig.type === LoggingConnectorType.Multi) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MultiLoggingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = MultiLoggingConnector.NAMESPACE;
	} else if (instanceConfig.type === LoggingConnectorType.Otel) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new OpenTelemetryLoggingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = OpenTelemetryLoggingConnector.NAMESPACE;
	} else if (instanceConfig.type === LoggingConnectorType.File) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new FileLoggingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = FileLoggingConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: LoggingConnectorFactory
	};
}

/**
 * Initialise the logging component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseLoggingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: LoggingComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === LoggingComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new LoggingService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingConnectorType: engineCore.getRegisteredInstanceType("loggingConnector")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(LoggingService);
	} else if (instanceConfig.type === LoggingComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new LoggingRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(LoggingRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
