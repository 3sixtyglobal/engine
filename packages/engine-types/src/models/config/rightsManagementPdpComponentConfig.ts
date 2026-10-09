// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPolicyDecisionPointServiceConstructorOptions } from "@3sixty/rights-management-pdp-service";
import type { RightsManagementPdpComponentType } from "../types/rightsManagementPdpComponentType.js";

/**
 * Rights management PDP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPdpComponentConfig = {
	type: typeof RightsManagementPdpComponentType.Service;
	options?: IPolicyDecisionPointServiceConstructorOptions;
};
