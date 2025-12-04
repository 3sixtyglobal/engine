// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Enforcement Processor component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPolicyEnforcementProcessorComponentType = {
	/**
	 * Example.
	 */
	Example: "example"
} as const;

/**
 * Rights management Policy Enforcement Processor component types.
 */
export type RightsManagementPolicyEnforcementProcessorComponentType =
	// eslint-disable-next-line max-len
	(typeof RightsManagementPolicyEnforcementProcessorComponentType)[keyof typeof RightsManagementPolicyEnforcementProcessorComponentType];
