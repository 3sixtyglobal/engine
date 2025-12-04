// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IExamplePolicyArbiterConstructorOptions } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyArbiterComponentType } from "../types/rightsManagementPolicyArbiterComponentType.js";

/**
 * Rights management policy arbiter component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPolicyArbiterComponentConfig = {
	type: typeof RightsManagementPolicyArbiterComponentType.Example;
	options?: IExamplePolicyArbiterConstructorOptions;
};
