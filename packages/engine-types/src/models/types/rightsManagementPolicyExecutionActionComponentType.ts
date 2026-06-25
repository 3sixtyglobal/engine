// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Execution Action component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPolicyExecutionActionComponentType = {
	/**
	 * Logging.
	 */
	Logging: "logging"
} as const;

/**
 * Rights management Policy Execution Action component types.
 */
export type RightsManagementPolicyExecutionActionComponentType =
	// eslint-disable-next-line max-len
	(typeof RightsManagementPolicyExecutionActionComponentType)[keyof typeof RightsManagementPolicyExecutionActionComponentType];
