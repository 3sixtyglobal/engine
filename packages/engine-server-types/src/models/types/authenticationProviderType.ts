// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication provider types.
 */
export const AuthenticationProviderType = {
	/**
	 * Passwords for accounts held in entity storage.
	 */
	ThreeSixty: "3sixty",

	/**
	 * The password accounts held in entity storage, signed in through OAuth 2.0.
	 */
	ThreeSixtyOAuth: "3sixty-oauth",

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
