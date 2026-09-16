// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Mailbox component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MailboxComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Mailbox component types.
 */
export type MailboxComponentType = (typeof MailboxComponentType)[keyof typeof MailboxComponentType];
