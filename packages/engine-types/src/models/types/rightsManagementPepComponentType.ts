// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PEP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPepComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management PEP component types.
 */
export type RightsManagementPepComponentType =
	(typeof RightsManagementPepComponentType)[keyof typeof RightsManagementPepComponentType];
