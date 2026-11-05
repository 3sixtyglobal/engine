// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication rate component types.
 */
export const AuthenticationRateComponentType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage"
} as const;

/**
 * Authentication rate component types.
 */
export type AuthenticationRateComponentType =
	(typeof AuthenticationRateComponentType)[keyof typeof AuthenticationRateComponentType];
