// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IDefaultPolicyArbiterConstructorOptions,
	IPassThroughPolicyArbiterConstructorOptions
} from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyArbiterComponentType } from "../types/rightsManagementPolicyArbiterComponentType.js";

/**
 * Rights management policy arbiter component config types.
 */
export type RightsManagementPolicyArbiterComponentConfig =
	| {
			type: typeof RightsManagementPolicyArbiterComponentType.PassThrough;
			options?: IPassThroughPolicyArbiterConstructorOptions;
	  }
	| {
			type: typeof RightsManagementPolicyArbiterComponentType.Default;
			options?: IDefaultPolicyArbiterConstructorOptions;
	  };
