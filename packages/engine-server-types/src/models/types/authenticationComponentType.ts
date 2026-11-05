// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication component types.
 */
export const AuthenticationComponentType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Authentication component types.
 */
export type AuthenticationComponentType =
	(typeof AuthenticationComponentType)[keyof typeof AuthenticationComponentType];
