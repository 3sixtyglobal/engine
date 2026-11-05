// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Messaging email connector types.
 */
export const MessagingEmailConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * AWS.
	 */
	Aws: "aws",

	/**
	 * SMTP.
	 */
	Smtp: "smtp"
} as const;

/**
 * Messaging email connector types.
 */
export type MessagingEmailConnectorType =
	(typeof MessagingEmailConnectorType)[keyof typeof MessagingEmailConnectorType];
