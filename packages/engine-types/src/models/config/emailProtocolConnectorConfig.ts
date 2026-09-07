// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IImapEmailConnectorConstructorOptions } from "@twin.org/mailbox-connector-imap";
import type { IPop3EmailConnectorConstructorOptions } from "@twin.org/mailbox-connector-pop3";
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
	  };
