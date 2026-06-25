// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PNAP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPnapComponentType = {
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
 * Rights management PNAP component types.
 */
export type RightsManagementPnapComponentType =
	(typeof RightsManagementPnapComponentType)[keyof typeof RightsManagementPnapComponentType];
