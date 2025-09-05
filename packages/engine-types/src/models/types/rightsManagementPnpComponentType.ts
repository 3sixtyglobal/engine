// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PNP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPnpComponentType = {
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
 * Rights management PNP component types.
 */
export type RightsManagementPnpComponentType =
	(typeof RightsManagementPnpComponentType)[keyof typeof RightsManagementPnpComponentType];
