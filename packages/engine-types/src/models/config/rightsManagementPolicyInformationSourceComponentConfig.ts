// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IIdentityPolicyInformationSourceConstructorOptions,
	IIdentityProfilePolicyInformationSourceConstructorOptions,
	IStaticPolicyInformationSourceConstructorOptions
} from "@3sixty/rights-management-plugins";
import type { RightsManagementPolicyInformationSourceComponentType } from "../types/rightsManagementPolicyInformationSourceComponentType.js";

/**
 * Rights management policy information source component config types.
 */
export type RightsManagementPolicyInformationSourceComponentConfig =
	| {
			type: typeof RightsManagementPolicyInformationSourceComponentType.Identity;
			options?: IIdentityPolicyInformationSourceConstructorOptions;
	  }
	| {
			type: typeof RightsManagementPolicyInformationSourceComponentType.IdentityProfile;
			options?: IIdentityProfilePolicyInformationSourceConstructorOptions;
	  }
	| {
			type: typeof RightsManagementPolicyInformationSourceComponentType.Static;
			options?: IStaticPolicyInformationSourceConstructorOptions;
	  };
