// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
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
import { SmtpMessagingEmailConnector } from "@twin.org/messaging-connector-smtp";
import {
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
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a messaging email connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseMessagingEmailConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingEmailConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof MessagingEmailConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MessagingEmailConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema({ email: true, sms: false, pushNotification: false });
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.messagingEmailEntryStorageConnectorType,
				nameof<EmailEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageMessagingEmailConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(EntityStorageMessagingEmailConnector)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageMessagingEmailConnector.NAMESPACE;
	} else if (instanceConfig.type === MessagingEmailConnectorType.Aws) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AwsMessagingEmailConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(AwsMessagingEmailConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = AwsMessagingEmailConnector.NAMESPACE;
	} else if (instanceConfig.type === MessagingEmailConnectorType.Smtp) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new SmtpMessagingEmailConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(SmtpMessagingEmailConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = SmtpMessagingEmailConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
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
export function initialiseMessagingSmsConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingSmsConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof MessagingSmsConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MessagingSmsConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema({ email: false, sms: true, pushNotification: false });
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.messagingSmsEntryStorageConnectorType,
				nameof<SmsEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageMessagingSmsConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(EntityStorageMessagingSmsConnector)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageMessagingSmsConnector.NAMESPACE;
	} else if (instanceConfig.type === MessagingSmsConnectorType.Aws) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AwsMessagingSmsConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(AwsMessagingSmsConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = AwsMessagingSmsConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: MessagingSmsConnectorFactory
	};
}

/**
 * Initialise a messaging push notification connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseMessagingPushNotificationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingPushNotificationConnectorConfig
): EngineTypeInitialiserReturn<
	typeof instanceConfig,
	typeof MessagingPushNotificationsConnectorFactory
> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MessagingPushNotificationConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema({ email: false, sms: false, pushNotification: true });
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.messagingDeviceEntryStorageConnectorType,
				nameof<PushNotificationDeviceEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.messagingMessageEntryStorageConnectorType,
				nameof<PushNotificationMessageEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageMessagingPushNotificationConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(EntityStorageMessagingPushNotificationConnector)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageMessagingPushNotificationConnector.NAMESPACE;
	} else if (instanceConfig.type === MessagingPushNotificationConnectorType.Aws) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AwsMessagingPushNotificationConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(AwsMessagingPushNotificationConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = AwsMessagingPushNotificationConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
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
export function initialiseMessagingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MessagingComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MessagingService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						messagingEmailConnectorType:
							engineCore.getRegisteredInstanceTypeOptional("messagingEmailConnector"),
						messagingSmsConnectorType:
							engineCore.getRegisteredInstanceTypeOptional("messagingSmsConnector"),
						messagingPushNotificationConnectorType: engineCore.getRegisteredInstanceTypeOptional(
							"messagingNotificationConnector"
						),
						messagingAdminComponentType:
							engineCore.getRegisteredInstanceTypeOptional("messagingAdminComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(MessagingService);
	}

	return {
		createComponent,
		instanceTypeName,
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
export function initialiseMessagingAdminComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MessagingAdminComponentConfig
): EngineTypeInitialiserReturn<MessagingAdminComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MessagingAdminComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaMessagingService();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.templateEntryStorageConnectorType,
				nameof<TemplateEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new MessagingAdminService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = nameofKebabCase(MessagingAdminService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
