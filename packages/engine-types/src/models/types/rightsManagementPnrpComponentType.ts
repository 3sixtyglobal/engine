// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PNRP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPnrpComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Rights management PNRP component types.
 */
export type RightsManagementPnrpComponentType =
	(typeof RightsManagementPnrpComponentType)[keyof typeof RightsManagementPnrpComponentType];
