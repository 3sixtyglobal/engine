// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IMailboxServiceConstructorOptions } from "@3sixty/mailbox-service";
import type { MailboxComponentType } from "../types/mailboxComponentType.js";

/**
 * Mailbox component config types.
 */
export type MailboxComponentConfig =
	| {
			type: typeof MailboxComponentType.Service;
			options?: IMailboxServiceConstructorOptions;
	  }
	| {
			type: typeof MailboxComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
