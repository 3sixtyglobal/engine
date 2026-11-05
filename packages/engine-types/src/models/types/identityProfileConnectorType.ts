// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity profile connector types.
 */
export const IdentityProfileConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage"
} as const;

/**
 * Identity profile connector types.
 */
export type IdentityProfileConnectorType =
	(typeof IdentityProfileConnectorType)[keyof typeof IdentityProfileConnectorType];
