// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authorization connector types.
 */
export const AuthorizationConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * Casbin.
	 */
	Casbin: "casbin"
} as const;

/**
 * Authorization connector types.
 */
export type AuthorizationConnectorType =
	(typeof AuthorizationConnectorType)[keyof typeof AuthorizationConnectorType];
