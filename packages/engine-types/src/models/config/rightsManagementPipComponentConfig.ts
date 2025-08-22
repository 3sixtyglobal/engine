// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPolicyInformationPointServiceOptions } from "@twin.org/rights-management-pip-service";
import type { RightsManagementPipComponentType } from "../types/rightsManagementPipComponentType";

/**
 * Rights management PIP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPipComponentConfig = {
	type: typeof RightsManagementPipComponentType.Service;
	options?: IPolicyInformationPointServiceOptions;
};
