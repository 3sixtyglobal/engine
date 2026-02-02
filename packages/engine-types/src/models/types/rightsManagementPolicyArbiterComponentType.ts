// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Arbiter component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPolicyArbiterComponentType = {
	/**
	 * PassThrough.
	 */
	PassThrough: "pass-through"
} as const;

/**
 * Rights management Policy Arbiter component types.
 */
export type RightsManagementPolicyArbiterComponentType =
	(typeof RightsManagementPolicyArbiterComponentType)[keyof typeof RightsManagementPolicyArbiterComponentType];
