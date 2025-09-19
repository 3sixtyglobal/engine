// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management DARP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementDarpComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management DARP component types.
 */
export type RightsManagementDarpComponentType =
	(typeof RightsManagementDarpComponentType)[keyof typeof RightsManagementDarpComponentType];
