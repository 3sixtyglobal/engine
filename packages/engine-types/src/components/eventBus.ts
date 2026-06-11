// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { LocalEventBusConnector } from "@twin.org/event-bus-connector-local";
import { EventBusConnectorFactory } from "@twin.org/event-bus-models";
import { EventBusService } from "@twin.org/event-bus-service";
import { EventBusSocketClient } from "@twin.org/event-bus-socket-client";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { EventBusComponentConfig } from "../models/config/eventBusComponentConfig.js";
import type { EventBusConnectorConfig } from "../models/config/eventBusConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { EventBusComponentType } from "../models/types/eventBusComponentType.js";
import { EventBusConnectorType } from "../models/types/eventBusConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a event bus connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseEventBusConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof EventBusConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === EventBusConnectorType.Local) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new LocalEventBusConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(nameof(LocalEventBusConnector))
					},
					createConfig.options
				)
			);
		instanceTypeName = LocalEventBusConnector.NAMESPACE;
	}

	return {
		createComponent,
		instanceTypeName,
		factory: EventBusConnectorFactory
	};
}

/**
 * Initialise the event bus component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseEventBusComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === EventBusComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new EventBusService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ eventBusConnectorType: engineCore.getRegisteredInstanceType("eventBusConnector") },
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(EventBusService);
	} else if (instanceConfig.type === EventBusComponentType.SocketClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new EventBusSocketClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(nameof(EventBusSocketClient))
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(EventBusSocketClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
