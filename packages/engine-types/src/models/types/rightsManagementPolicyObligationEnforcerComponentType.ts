// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Obligation Enforcer component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPolicyObligationEnforcerComponentType = {
	/**
	 * PassThrough.
	 */
	PassThrough: "pass-through"
} as const;

/**
 * Rights management Policy Obligation Enforcer component types.
 */
export type RightsManagementPolicyObligationEnforcerComponentType =
	// eslint-disable-next-line max-len
	(typeof RightsManagementPolicyObligationEnforcerComponentType)[keyof typeof RightsManagementPolicyObligationEnforcerComponentType];
