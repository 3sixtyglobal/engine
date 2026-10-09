// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPolicyManagementPointServiceConstructorOptions } from "@3sixty/rights-management-pmp-service";
import type { RightsManagementPmpComponentType } from "../types/rightsManagementPmpComponentType.js";

/**
 * Rights management PMP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPmpComponentConfig = {
	type: typeof RightsManagementPmpComponentType.Service;
	options?: IPolicyManagementPointServiceConstructorOptions;
};
