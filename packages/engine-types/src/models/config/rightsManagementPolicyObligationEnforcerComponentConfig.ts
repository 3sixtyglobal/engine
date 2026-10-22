// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPassThroughPolicyObligationEnforcerConstructorOptions } from "@3sixty/rights-management-plugins";
import type { RightsManagementPolicyObligationEnforcerComponentType } from "../types/rightsManagementPolicyObligationEnforcerComponentType.js";

/**
 * Rights management policy obligation enforcer component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPolicyObligationEnforcerComponentConfig = {
	type: typeof RightsManagementPolicyObligationEnforcerComponentType.PassThrough;
	options?: IPassThroughPolicyObligationEnforcerConstructorOptions;
};
