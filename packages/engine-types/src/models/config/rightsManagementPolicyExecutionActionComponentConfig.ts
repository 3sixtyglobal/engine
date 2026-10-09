// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILoggingPolicyExecutionActionConstructorOptions } from "@3sixty/rights-management-plugins";
import type { RightsManagementPolicyExecutionActionComponentType } from "../types/rightsManagementPolicyExecutionActionComponentType.js";

/**
 * Rights management policy execution action component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPolicyExecutionActionComponentConfig = {
	type: typeof RightsManagementPolicyExecutionActionComponentType.Logging;
	options?: ILoggingPolicyExecutionActionConstructorOptions;
};
