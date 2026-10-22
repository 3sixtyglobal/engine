// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPassThroughPolicyNegotiatorConstructorOptions } from "@3sixty/rights-management-plugins";
import type { RightsManagementPolicyNegotiatorComponentType } from "../types/rightsManagementPolicyNegotiatorComponentType.js";

/**
 * Rights management policy negotiator component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPolicyNegotiatorComponentConfig = {
	type: typeof RightsManagementPolicyNegotiatorComponentType.PassThrough;
	options?: IPassThroughPolicyNegotiatorConstructorOptions;
};
