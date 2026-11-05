// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Enforcement Processor component types.
 */
export const RightsManagementPolicyEnforcementProcessorComponentType = {
	/**
	 * Pass Through.
	 */
	PassThrough: "pass-through",

	/**
	 * Default.
	 */
	Default: "default"
} as const;

/**
 * Rights management Policy Enforcement Processor component types.
 */
export type RightsManagementPolicyEnforcementProcessorComponentType =
	// eslint-disable-next-line max-len
	(typeof RightsManagementPolicyEnforcementProcessorComponentType)[keyof typeof RightsManagementPolicyEnforcementProcessorComponentType];
