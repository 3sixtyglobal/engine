// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management DAP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementDapComponentType = {
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
 * Rights management DAP component types.
 */
export type RightsManagementDapComponentType =
	(typeof RightsManagementDapComponentType)[keyof typeof RightsManagementDapComponentType];
