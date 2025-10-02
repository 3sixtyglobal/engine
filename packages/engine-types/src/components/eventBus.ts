// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { LocalEventBusConnector } from "@twin.org/event-bus-connector-local";
import {
	EventBusConnectorFactory,
	type IEventBusComponent,
	type IEventBusConnector
} from "@twin.org/event-bus-models";
import { EventBusService } from "@twin.org/event-bus-service";
import { EventBusSocketClient } from "@twin.org/event-bus-socket-client";
import { nameofKebabCase } from "@twin.org/nameof";
import type { EventBusComponentConfig } from "../models/config/eventBusComponentConfig";
import type { EventBusConnectorConfig } from "../models/config/eventBusConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { EventBusComponentType } from "../models/types/eventBusComponentType";
import { EventBusConnectorType } from "../models/types/eventBusConnectorType";

/**
 * Initialise a event bus connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseEventBusConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof EventBusConnectorFactory;
	component?: IComponent;
}> {
	let connector: IEventBusConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === EventBusConnectorType.Local) {
		connector = new LocalEventBusConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = LocalEventBusConnector.NAMESPACE;
	}

	return {
		instanceType,
		factory: EventBusConnectorFactory,
		component: connector
	};
}

/**
 * Initialise the event bus component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseEventBusComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IEventBusComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === EventBusComponentType.Service) {
		component = new EventBusService({
			eventBusConnectorType: engineCore.getRegisteredInstanceType("eventBusConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(EventBusService);
	} else if (instanceConfig.type === EventBusComponentType.SocketClient) {
		component = new EventBusSocketClient({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(EventBusSocketClient);
	}

	return {
		instanceType,
		factory: ComponentFactory,
		component
	};
}
