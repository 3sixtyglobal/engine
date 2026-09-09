// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IMailboxServiceConstructorOptions } from "@twin.org/mailbox-service";
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
