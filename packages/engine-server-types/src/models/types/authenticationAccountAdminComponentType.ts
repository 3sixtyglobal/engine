// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication account admin component types.
 */
export const AuthenticationAccountAdminComponentType = {
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
 * Authentication account admin component types.
 */
export type AuthenticationAccountAdminComponentType =
	(typeof AuthenticationAccountAdminComponentType)[keyof typeof AuthenticationAccountAdminComponentType];
