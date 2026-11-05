// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication account component types.
 */
export const AuthenticationAccountComponentType = {
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
 * Authentication account component types.
 */
export type AuthenticationAccountComponentType =
	(typeof AuthenticationAccountComponentType)[keyof typeof AuthenticationAccountComponentType];
