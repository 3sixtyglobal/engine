// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Messaging admin component types.
 */
export const MessagingAdminComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Messaging admin component types.
 */
export type MessagingAdminComponentType =
	(typeof MessagingAdminComponentType)[keyof typeof MessagingAdminComponentType];
