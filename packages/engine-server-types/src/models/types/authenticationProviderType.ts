// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication provider types.
 */
export const AuthenticationProviderType = {
	/**
	 * Passwords for accounts held in entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * Google.
	 */
	Google: "google",

	/**
	 * Microsoft.
	 */
	Microsoft: "microsoft"
} as const;

/**
 * Authentication provider types.
 */
export type AuthenticationProviderType =
	(typeof AuthenticationProviderType)[keyof typeof AuthenticationProviderType];
