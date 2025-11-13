// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineModuleConfig } from "@twin.org/engine-models";
import type { IDataAccessRequestPointServiceConstructorOptions } from "@twin.org/rights-management-dap-service";
import type { RightsManagementDarpComponentType } from "../types/rightsManagementDarpComponentType.js";

/**
 * Rights management DARP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementDarpComponentConfig = {
	type: typeof RightsManagementDarpComponentType.Service;
	options: IDataAccessRequestPointServiceConstructorOptions & {
		negotiatorModulesConfig?: IEngineModuleConfig[];
	};
};
