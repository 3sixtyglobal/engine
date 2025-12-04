// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPolicyEnforcementPointServiceConstructorOptions } from "@twin.org/rights-management-pep-service";
import type { RightsManagementPepComponentType } from "../types/rightsManagementPepComponentType.js";

/**
 * Rights management PEP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPepComponentConfig = {
	type: typeof RightsManagementPepComponentType.Service;
	options?: IPolicyEnforcementPointServiceConstructorOptions;
};
