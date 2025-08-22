// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management PIP component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
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
