// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Information component types.
 */
export const InformationComponentType = {
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
 * Information component types.
 */
export type InformationComponentType =
	(typeof InformationComponentType)[keyof typeof InformationComponentType];
