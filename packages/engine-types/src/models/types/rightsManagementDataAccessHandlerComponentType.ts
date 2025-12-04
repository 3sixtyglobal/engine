// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Data Access Handler component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementDataAccessHandlerComponentType = {
	/**
	 * Example.
	 */
	Example: "example"
} as const;

/**
 * Rights management Data Access Handler component types.
 */
export type RightsManagementDataAccessHandlerComponentType =
	// eslint-disable-next-line max-len
	(typeof RightsManagementDataAccessHandlerComponentType)[keyof typeof RightsManagementDataAccessHandlerComponentType];
