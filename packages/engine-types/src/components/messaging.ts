// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
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
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { MessagingAdminComponentConfig } from "../models/config/messagingAdminComponentConfig.js";
import type { MessagingComponentConfig } from "../models/config/messagingComponentConfig.js";
import type { MessagingEmailConnectorConfig } from "../models/config/messagingEmailConnectorConfig.js";
import type { MessagingPushNotificationConnectorConfig } from "../models/config/messagingPushNotificationConnectorConfig.js";
import type { MessagingSmsConnectorConfig } from "../models/config/messagingSmsConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { MessagingAdminComponentType } from "../models/types/messagingAdminComponentType.js";
import { MessagingComponentType } from "../models/types/messagingComponentType.js";
import { MessagingEmailConnectorType } from "../models/types/messagingEmailConnectorType.js";
import { MessagingPushNotificationConnectorType } from "../models/types/messagingPushNotificationConnectorType.js";
import { MessagingSmsConnectorType } from "../models/types/messagingSmsConnectorType.js";

/**
 * Initialise a messaging email connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseMessagingEmailConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingEmailConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof MessagingEmailConnectorFactory;
	component?: IComponent;
}> {
	let component: IMessagingEmailConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === MessagingEmailConnectorType.EntityStorage) {
		initSchema({ email: true, sms: false, pushNotification: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingEmailEntryStorageConnectorType,
			nameof<EmailEntry>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		component = new EntityStorageMessagingEmailConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingEmailConnector.NAMESPACE;
	} else if (instanceConfig.type === MessagingEmailConnectorType.Aws) {
		component = new AwsMessagingEmailConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = AwsMessagingEmailConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: MessagingEmailConnectorFactory
	};
}

/**
 * Initialise a messaging sms connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseMessagingSmsConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingSmsConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof MessagingSmsConnectorFactory;
	component?: IComponent;
}> {
	let connector: IMessagingSmsConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === MessagingSmsConnectorType.EntityStorage) {
		initSchema({ email: false, sms: true, pushNotification: false });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingSmsEntryStorageConnectorType,
			nameof<SmsEntry>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		connector = new EntityStorageMessagingSmsConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingSmsConnector.NAMESPACE;
	} else if (instanceConfig.type === MessagingSmsConnectorType.Aws) {
		connector = new AwsMessagingSmsConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = AwsMessagingSmsConnector.NAMESPACE;
	}

	return {
		instanceType,
		factory: MessagingSmsConnectorFactory,
		component: connector
	};
}

/**
 * Initialise a messaging push notification connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseMessagingPushNotificationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingPushNotificationConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof MessagingPushNotificationsConnectorFactory;
	component?: IComponent;
}> {
	let component: IMessagingPushNotificationsConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === MessagingPushNotificationConnectorType.EntityStorage) {
		initSchema({ email: false, sms: false, pushNotification: true });
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingDeviceEntryStorageConnectorType,
			nameof<PushNotificationDeviceEntry>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.messagingMessageEntryStorageConnectorType,
			nameof<PushNotificationMessageEntry>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		component = new EntityStorageMessagingPushNotificationConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageMessagingPushNotificationConnector.NAMESPACE;
	} else if (instanceConfig.type === MessagingPushNotificationConnectorType.Aws) {
		component = new AwsMessagingPushNotificationConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = AwsMessagingPushNotificationConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: MessagingPushNotificationsConnectorFactory
	};
}

/**
 * Initialise the messaging component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseMessagingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IMessagingComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === MessagingComponentType.Service) {
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
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}

/**
 * Initialise the messaging admin component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseMessagingAdminComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingAdminComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IMessagingAdminComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === MessagingAdminComponentType.Service) {
		initSchemaMessagingService();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.templateEntryStorageConnectorType,
			nameof<TemplateEntry>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);

		component = new MessagingAdminService({
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(MessagingAdminService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
