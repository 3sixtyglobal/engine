// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Mail storage component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MailStorageComponentType = {
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
 * Mail storage component types.
 */
export type MailStorageComponentType =
	(typeof MailStorageComponentType)[keyof typeof MailStorageComponentType];
