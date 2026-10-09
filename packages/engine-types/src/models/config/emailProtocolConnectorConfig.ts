// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IGmailEmailConnectorConstructorOptions } from "@3sixty/mailbox-connector-gmail";
import type { IImapEmailConnectorConstructorOptions } from "@3sixty/mailbox-connector-imap";
import type { IOutlookEmailConnectorConstructorOptions } from "@3sixty/mailbox-connector-outlook";
import type { IPop3EmailConnectorConstructorOptions } from "@3sixty/mailbox-connector-pop3";
import type { EmailProtocolConnectorType } from "../types/emailProtocolConnectorType.js";

/**
 * Email protocol connector config types.
 */
export type EmailProtocolConnectorConfig =
	| {
			type: typeof EmailProtocolConnectorType.Pop3;
			options: IPop3EmailConnectorConstructorOptions;
	  }
	| {
			type: typeof EmailProtocolConnectorType.Imap;
			options: IImapEmailConnectorConstructorOptions;
	  }
	| {
			type: typeof EmailProtocolConnectorType.Gmail;
			options: IGmailEmailConnectorConstructorOptions;
	  }
	| {
			type: typeof EmailProtocolConnectorType.Outlook;
			options: IOutlookEmailConnectorConstructorOptions;
	  };
