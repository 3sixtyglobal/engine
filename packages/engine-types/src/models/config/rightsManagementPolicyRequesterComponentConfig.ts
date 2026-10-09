// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPassThroughPolicyRequesterConstructorOptions } from "@3sixty/rights-management-plugins";
import type { RightsManagementPolicyRequesterComponentType } from "../types/rightsManagementPolicyRequesterComponentType.js";

/**
 * Rights management policy requester component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPolicyRequesterComponentConfig = {
	type: typeof RightsManagementPolicyRequesterComponentType.PassThrough;
	options?: IPassThroughPolicyRequesterConstructorOptions;
};
