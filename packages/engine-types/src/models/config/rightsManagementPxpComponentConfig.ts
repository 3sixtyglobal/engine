// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPolicyExecutionPointServiceConstructorOptions } from "@twin.org/rights-management-pxp-service";
import type { RightsManagementPxpComponentType } from "../types/rightsManagementPxpComponentType";

/**
 * Rights management PXP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPxpComponentConfig = {
	type: typeof RightsManagementPxpComponentType.Service;
	options?: IPolicyExecutionPointServiceConstructorOptions;
};
