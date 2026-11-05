// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Document management component types.
 */
export const DocumentManagementComponentType = {
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
 * Document management component types.
 */
export type DocumentManagementComponentType =
	(typeof DocumentManagementComponentType)[keyof typeof DocumentManagementComponentType];
