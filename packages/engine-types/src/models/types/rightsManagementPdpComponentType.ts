// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PDP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPdpComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management PDP component types.
 */
export type RightsManagementPdpComponentType =
	(typeof RightsManagementPdpComponentType)[keyof typeof RightsManagementPdpComponentType];
