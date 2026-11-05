// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Identity component types.
 */
export const IdentityComponentType = {
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
 * Identity component types.
 */
export type IdentityComponentType =
	(typeof IdentityComponentType)[keyof typeof IdentityComponentType];
