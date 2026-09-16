// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Email protocol connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EmailProtocolConnectorType = {
	/**
	 * POP3.
	 */
	Pop3: "pop3",

	/**
	 * IMAP.
	 */
	Imap: "imap",

	/**
	 * Gmail.
	 */
	Gmail: "gmail",

	/**
	 * Outlook.
	 */
	Outlook: "outlook"
} as const;

/**
 * Email protocol connector types.
 */
export type EmailProtocolConnectorType =
	(typeof EmailProtocolConnectorType)[keyof typeof EmailProtocolConnectorType];
