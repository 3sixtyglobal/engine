// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authorization component types.
 */
export const AuthorizationComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Authorization component types.
 */
export type AuthorizationComponentType =
	(typeof AuthorizationComponentType)[keyof typeof AuthorizationComponentType];
