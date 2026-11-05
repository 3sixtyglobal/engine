// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PXP component types.
 */
export const RightsManagementPxpComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management PXP component types.
 */
export type RightsManagementPxpComponentType =
	(typeof RightsManagementPxpComponentType)[keyof typeof RightsManagementPxpComponentType];
