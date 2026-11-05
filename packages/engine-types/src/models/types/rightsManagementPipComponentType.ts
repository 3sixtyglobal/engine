// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PIP component types.
 */
export const RightsManagementPipComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management PIP component types.
 */
export type RightsManagementPipComponentType =
	(typeof RightsManagementPipComponentType)[keyof typeof RightsManagementPipComponentType];
