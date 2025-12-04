// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Requester component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPolicyRequesterComponentType = {
	/**
	 * Example.
	 */
	Example: "example"
} as const;

/**
 * Rights management Policy Requester component types.
 */
export type RightsManagementPolicyRequesterComponentType =
	(typeof RightsManagementPolicyRequesterComponentType)[keyof typeof RightsManagementPolicyRequesterComponentType];
