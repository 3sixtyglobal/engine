// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity connector types.
 */
export const IdentityConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * IOTA.
	 */
	Iota: "iota"
} as const;

/**
 * Identity connector types.
 */
export type IdentityConnectorType =
	(typeof IdentityConnectorType)[keyof typeof IdentityConnectorType];
