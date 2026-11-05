// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Negotiator component types.
 */
export const RightsManagementPolicyNegotiatorComponentType = {
	/**
	 * Pass Through.
	 */
	PassThrough: "pass-through"
} as const;

/**
 * Rights management Policy Negotiator component types.
 */
export type RightsManagementPolicyNegotiatorComponentType =
	(typeof RightsManagementPolicyNegotiatorComponentType)[keyof typeof RightsManagementPolicyNegotiatorComponentType];
