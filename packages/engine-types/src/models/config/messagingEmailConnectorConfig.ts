// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAwsMessagingEmailConnectorConstructorOptions } from "@3sixty/messaging-connector-aws";
import type { IEntityStorageMessagingEmailConnectorConstructorOptions } from "@3sixty/messaging-connector-entity-storage";
import type { ISmtpMessagingEmailConnectorConstructorOptions } from "@3sixty/messaging-connector-smtp";
import type { MessagingEmailConnectorType } from "../types/messagingEmailConnectorType.js";

/**
 * Messaging email connector config types.
 */
export type MessagingEmailConnectorConfig =
	| {
			type: typeof MessagingEmailConnectorType.EntityStorage;
			options?: IEntityStorageMessagingEmailConnectorConstructorOptions;
	  }
	| {
			type: typeof MessagingEmailConnectorType.Aws;
			options: IAwsMessagingEmailConnectorConstructorOptions;
	  }
	| {
			type: typeof MessagingEmailConnectorType.Smtp;
			options: ISmtpMessagingEmailConnectorConstructorOptions;
	  };
