// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export async function initialiseEventBusConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusConnectorConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Event Bus Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IEventBusConnector;
	let instanceType: string;

	if (type === EventBusConnectorType.Local) {
		connector = new LocalEventBusConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = LocalEventBusConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "eventBusConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	EventBusConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the event bus component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseEventBusComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EventBusComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Event Bus Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IEventBusComponent;
	let instanceType: string;

	if (type === EventBusComponentType.Service) {
		component = new EventBusService({
			eventBusConnectorType: engineCore.getRegisteredInstanceType("eventBusConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(EventBusService);
	} else if (type === EventBusComponentType.SocketClient) {
		component = new EventBusSocketClient({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(EventBusSocketClient);
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "EventBusComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
