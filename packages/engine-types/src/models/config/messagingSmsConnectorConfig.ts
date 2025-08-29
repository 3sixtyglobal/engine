// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAwsMessagingSmsConnectorConstructorOptions } from "@twin.org/messaging-connector-aws";
import type { IEntityStorageMessagingSmsConnectorConstructorOptions } from "@twin.org/messaging-connector-entity-storage";
import type { MessagingSmsConnectorType } from "../types/messagingSmsConnectorType";

/**
 * Messaging sms connector config types.
 */
export type MessagingSmsConnectorConfig =
	| {
			type: typeof MessagingSmsConnectorType.EntityStorage;
			options?: IEntityStorageMessagingSmsConnectorConstructorOptions;
	  }
	| {
			type: typeof MessagingSmsConnectorType.Aws;
			options: IAwsMessagingSmsConnectorConstructorOptions;
	  };
