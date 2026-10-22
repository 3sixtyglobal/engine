// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAwsMessagingPushNotificationConnectorConstructorOptions } from "@3sixty/messaging-connector-aws";
import type { IEntityStorageMessagingPushNotificationConnectorConstructorOptions } from "@3sixty/messaging-connector-entity-storage";
import type { MessagingPushNotificationConnectorType } from "../types/messagingPushNotificationConnectorType.js";

/**
 * Messaging push notification connector config types.
 */
export type MessagingPushNotificationConnectorConfig =
	| {
			type: typeof MessagingPushNotificationConnectorType.EntityStorage;
			options?: IEntityStorageMessagingPushNotificationConnectorConstructorOptions;
	  }
	| {
			type: typeof MessagingPushNotificationConnectorType.Aws;
			options: IAwsMessagingPushNotificationConnectorConstructorOptions;
	  };
