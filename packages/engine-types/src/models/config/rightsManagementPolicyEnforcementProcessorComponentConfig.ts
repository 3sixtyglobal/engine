// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPassThroughPolicyEnforcementProcessorConstructorOptions } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyEnforcementProcessorComponentType } from "../types/rightsManagementPolicyEnforcementProcessorComponentType.js";

/**
 * Rights management policy enforcement processor component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPolicyEnforcementProcessorComponentConfig = {
	type: typeof RightsManagementPolicyEnforcementProcessorComponentType.PassThrough;
	options?: IPassThroughPolicyEnforcementProcessorConstructorOptions;
};
