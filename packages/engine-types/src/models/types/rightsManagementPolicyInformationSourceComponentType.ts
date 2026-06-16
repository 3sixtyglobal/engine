// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Rights management Policy Information Source component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RightsManagementPolicyInformationSourceComponentType = {
	/**
	 * Identity.
	 */
	Identity: "identity",

	/**
	 * Identity Profile.
	 */
	IdentityProfile: "identity-profile",

	/**
	 * Static.
	 */
	Static: "static"
} as const;

/**
 * Rights management Policy Information Source component types.
 */
export type RightsManagementPolicyInformationSourceComponentType =
	// eslint-disable-next-line max-len
	(typeof RightsManagementPolicyInformationSourceComponentType)[keyof typeof RightsManagementPolicyInformationSourceComponentType];
