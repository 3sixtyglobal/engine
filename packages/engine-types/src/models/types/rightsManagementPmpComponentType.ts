// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PMP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPmpComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management PMP component types.
 */
export type RightsManagementPmpComponentType =
	(typeof RightsManagementPmpComponentType)[keyof typeof RightsManagementPmpComponentType];
