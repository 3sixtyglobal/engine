// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import {
	AwsMessagingEmailConnector,
	AwsMessagingPushNotificationConnector,
	AwsMessagingSmsConnector
} from "@twin.org/messaging-connector-aws";
import {
	type EmailEntry,
	EntityStorageMessagingEmailConnector,
	EntityStorageMessagingPushNotificationConnector,
	EntityStorageMessagingSmsConnector,
	initSchema,
	type PushNotificationDeviceEntry,
	type PushNotificationMessageEntry,
	type SmsEntry
} from "@twin.org/messaging-connector-entity-storage";
import {
	type IMessagingAdminComponent,
	type IMessagingComponent,
	type IMessagingEmailConnector,
	type IMessagingPushNotificationsConnector,
	type IMessagingSmsConnector,
	MessagingEmailConnectorFactory,
	MessagingPushNotificationsConnectorFactory,
	MessagingSmsConnectorFactory
} from "@twin.org/messaging-models";
import {
	initSchema as initSchemaMessagingService,
	MessagingAdminService,
	MessagingService,
	type TemplateEntry
} from "@twin.org/messaging-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { MessagingAdminComponentConfig } from "../models/config/messagingAdminComponentConfig";
import type { MessagingComponentConfig } from "../models/config/messagingComponentConfig";
import type { MessagingEmailConnectorConfig } from "../models/config/messagingEmailConnectorConfig";
import type { MessagingPushNotificationConnectorConfig } from "../models/config/messagingPushNotificationConnectorConfig";
import type { MessagingSmsConnectorConfig } from "../models/config/messagingSmsConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { MessagingAdminComponentType } from "../models/types/messagingAdminComponentType";
import { MessagingComponentType } from "../models/types/messagingComponentType";
import { MessagingEmailConnectorType } from "../models/types/messagingEmailConnectorType";
import { MessagingPushNotificationConnectorType } from "../models/types/messagingPushNotificationConnectorType";
import { MessagingSmsConnectorType } from "../models/types/messagingSmsConnectorType";

/**
 * Initialise a messaging email connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export async function initialiseMessagingEmailConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingEmailConnectorConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging Email Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IMessagingEmailConnector;
	let instanceType: string;

	if (type === MessagingEmailConnectorType.EntityStorage) {
		initSchema({ email: true, sms: false, pushNotification: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingEmailEntryStorageConnectorType,
			nameof<EmailEntry>()
		);
		connector = new EntityStorageMessagingEmailConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingEmailConnector.NAMESPACE;
	} else if (type === MessagingEmailConnectorType.Aws) {
		connector = new AwsMessagingEmailConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = AwsMessagingEmailConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "messagingEmailConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	MessagingEmailConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise a messaging sms connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export async function initialiseMessagingSmsConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingSmsConnectorConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging SMS Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IMessagingSmsConnector;
	let instanceType: string;

	if (type === MessagingSmsConnectorType.EntityStorage) {
		initSchema({ email: false, sms: true, pushNotification: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingSmsEntryStorageConnectorType,
			nameof<SmsEntry>()
		);
		connector = new EntityStorageMessagingSmsConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingSmsConnector.NAMESPACE;
	} else if (type === MessagingSmsConnectorType.Aws) {
		connector = new AwsMessagingSmsConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = AwsMessagingSmsConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "messagingSmsConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	MessagingSmsConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise a messaging push notification connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the connector type is unknown.
 */
export async function initialiseMessagingPushNotificationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingPushNotificationConnectorConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging Push Notification Connector: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let connector: IMessagingPushNotificationsConnector;
	let instanceType: string;

	if (type === MessagingPushNotificationConnectorType.EntityStorage) {
		initSchema({ email: false, sms: false, pushNotification: true });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingDeviceEntryStorageConnectorType,
			nameof<PushNotificationDeviceEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingMessageEntryStorageConnectorType,
			nameof<PushNotificationMessageEntry>()
		);
		connector = new EntityStorageMessagingPushNotificationConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingPushNotificationConnector.NAMESPACE;
	} else if (type === MessagingPushNotificationConnectorType.Aws) {
		connector = new AwsMessagingPushNotificationConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = AwsMessagingPushNotificationConnector.NAMESPACE;
	} else {
		throw new GeneralError("engineCore", "connectorUnknownType", {
			type,
			connectorType: "messagingPushNotificationConnector"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component: connector });
	MessagingPushNotificationsConnectorFactory.register(finalInstanceType, () => connector);
	return finalInstanceType;
}

/**
 * Initialise the messaging component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseMessagingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IMessagingComponent;
	let instanceType: string;

	if (type === MessagingComponentType.Service) {
		component = new MessagingService({
			messagingEmailConnectorType:
				engineCore.getRegisteredInstanceTypeOptional("messagingEmailConnector"),
			messagingSmsConnectorType:
				engineCore.getRegisteredInstanceTypeOptional("messagingSmsConnector"),
			messagingPushNotificationConnectorType: engineCore.getRegisteredInstanceTypeOptional(
				"messagingNotificationConnector"
			),
			messagingAdminComponentType:
				engineCore.getRegisteredInstanceTypeOptional("messagingAdminComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(MessagingService);
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "messagingComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}

/**
 * Initialise the messaging admin component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseMessagingAdminComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingAdminComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Messaging Admin Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IMessagingAdminComponent;
	let instanceType: string;

	if (type === MessagingAdminComponentType.Service) {
		initSchemaMessagingService();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.templateEntryStorageConnectorType,
			nameof<TemplateEntry>()
		);

		component = new MessagingAdminService({
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(MessagingAdminService);
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "messagingAdminComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
