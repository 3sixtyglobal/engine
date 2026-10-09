// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import type { IComponent } from "@3sixty/core";
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import {
	GmailEmailConnector,
	initSchema as initSchemaGmail
} from "@3sixty/mailbox-connector-gmail";
import { ImapEmailConnector, initSchema as initSchemaImap } from "@3sixty/mailbox-connector-imap";
import {
	OutlookEmailConnector,
	initSchema as initSchemaOutlook
} from "@3sixty/mailbox-connector-outlook";
import { Pop3EmailConnector, initSchema as initSchemaPop3 } from "@3sixty/mailbox-connector-pop3";
import { EmailProtocolConnectorFactory } from "@3sixty/mailbox-models";
import { MailboxRestClient, MailStorageRestClient } from "@3sixty/mailbox-rest-client";
import {
	type StoredEmail,
	initSchema as initSchemaMailboxService,
	type Mailbox,
	MailboxService,
	MailStorageService
} from "@3sixty/mailbox-service";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { EmailProtocolConnectorConfig } from "../models/config/emailProtocolConnectorConfig.js";
import type { MailboxComponentConfig } from "../models/config/mailboxComponentConfig.js";
import type { MailStorageComponentConfig } from "../models/config/mailStorageComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { EmailProtocolConnectorType } from "../models/types/emailProtocolConnectorType.js";
import { MailboxComponentType } from "../models/types/mailboxComponentType.js";
import { MailStorageComponentType } from "../models/types/mailStorageComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise an email protocol connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseEmailProtocolConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EmailProtocolConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof EmailProtocolConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === EmailProtocolConnectorType.Pop3) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new Pop3EmailConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(Pop3EmailConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = Pop3EmailConnector.NAMESPACE;
	} else if (instanceConfig.type === EmailProtocolConnectorType.Imap) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new ImapEmailConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(ImapEmailConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = ImapEmailConnector.NAMESPACE;
	} else if (instanceConfig.type === EmailProtocolConnectorType.Gmail) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new GmailEmailConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(GmailEmailConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = GmailEmailConnector.NAMESPACE;
	} else if (instanceConfig.type === EmailProtocolConnectorType.Outlook) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new OutlookEmailConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(OutlookEmailConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = OutlookEmailConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: EmailProtocolConnectorFactory
	};
}

/**
 * Initialise the mail storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseMailStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MailStorageComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MailStorageComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaMailboxService();
			initSchemaGmail();
			initSchemaImap();
			initSchemaOutlook();
			initSchemaPop3();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.storedEmailEntityStorageType,
				nameof<StoredEmail>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new MailStorageService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(MailStorageService)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(MailStorageService);
	} else if (instanceConfig.type === MailStorageComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MailStorageRestClient(createConfig.options);
		instanceTypeName = nameofKebabCase(MailStorageRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}

/**
 * Initialise the mailbox component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseMailboxComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MailboxComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MailboxComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaMailboxService();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.mailboxEntityStorageType,
				nameof<Mailbox>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new MailboxService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						mailStorageComponentType: engineCore.getRegisteredInstanceType("mailStorageComponent"),
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(MailboxService)
						),
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(MailboxService)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(MailboxService);
	} else if (instanceConfig.type === MailboxComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MailboxRestClient(createConfig.options);
		instanceTypeName = nameofKebabCase(MailboxRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
