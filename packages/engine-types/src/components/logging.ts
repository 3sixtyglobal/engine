// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { ConsoleLoggingConnector } from "@twin.org/logging-connector-console";
import {
	EntityStorageLoggingConnector,
	initSchema as initSchemaLogging,
	type LogEntry
} from "@twin.org/logging-connector-entity-storage";
import {
	LoggingConnectorFactory,
	MultiLoggingConnector,
	type ILoggingComponent,
	type ILoggingConnector
} from "@twin.org/logging-models";
import { LoggingClient } from "@twin.org/logging-rest-client";
import { LoggingService } from "@twin.org/logging-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { LoggingComponentConfig } from "../models/config/loggingComponentConfig";
import type { LoggingConnectorConfig } from "../models/config/loggingConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { LoggingComponentType } from "../models/types/loggingComponentType";
import { LoggingConnectorType } from "../models/types/loggingConnectorType";

/**
 * Initialise the logging connector.
 * @param engineCore The engine core.
 * @param context The engine core context.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseLoggingConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: LoggingConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof LoggingConnectorFactory;
	component?: IComponent;
}> {
	let component: ILoggingConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === LoggingConnectorType.Console) {
		component = new ConsoleLoggingConnector(instanceConfig.options);
		instanceType = ConsoleLoggingConnector.NAMESPACE;
	} else if (instanceConfig.type === LoggingConnectorType.EntityStorage) {
		initSchemaLogging();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.logEntryStorageConnectorType,
			nameof<LogEntry>()
		);
		component = new EntityStorageLoggingConnector(instanceConfig.options);
		instanceType = EntityStorageLoggingConnector.NAMESPACE;
	} else if (instanceConfig.type === LoggingConnectorType.Multi) {
		component = new MultiLoggingConnector(instanceConfig.options);
		instanceType = MultiLoggingConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
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
export async function initialiseLoggingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: LoggingComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: ILoggingComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === LoggingComponentType.Service) {
		component = new LoggingService({
			loggingConnectorType: engineCore.getRegisteredInstanceType("loggingConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(LoggingService);
	} else if (instanceConfig.type === LoggingComponentType.RestClient) {
		component = new LoggingClient(instanceConfig.options);
		instanceType = nameofKebabCase(LoggingClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
