// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Messaging component types.
 */
export const MessagingComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Messaging component types.
 */
export type MessagingComponentType =
	(typeof MessagingComponentType)[keyof typeof MessagingComponentType];
