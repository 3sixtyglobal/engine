// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Requester component types.
 */
export const RightsManagementPolicyRequesterComponentType = {
	/**
	 * PassThrough.
	 */
	PassThrough: "pass-through"
} as const;

/**
 * Rights management Policy Requester component types.
 */
export type RightsManagementPolicyRequesterComponentType =
	(typeof RightsManagementPolicyRequesterComponentType)[keyof typeof RightsManagementPolicyRequesterComponentType];
