// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IDefaultPolicyEnforcementProcessorConstructorOptions,
	IPassThroughPolicyEnforcementProcessorConstructorOptions
} from "@3sixty/rights-management-plugins";
import type { RightsManagementPolicyEnforcementProcessorComponentType } from "../types/rightsManagementPolicyEnforcementProcessorComponentType.js";

/**
 * Rights management policy enforcement processor component config types.
 */
export type RightsManagementPolicyEnforcementProcessorComponentConfig =
	| {
			type: typeof RightsManagementPolicyEnforcementProcessorComponentType.PassThrough;
			options?: IPassThroughPolicyEnforcementProcessorConstructorOptions;
	  }
	| {
			type: typeof RightsManagementPolicyEnforcementProcessorComponentType.Default;
			options?: IDefaultPolicyEnforcementProcessorConstructorOptions;
	  };
