// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IEngineModuleConfig } from "@twin.org/engine-models";
import type { IDataAccessPointServiceConstructorOptions } from "@twin.org/rights-management-dap-service";
import type { RightsManagementDapComponentType } from "../types/rightsManagementDapComponentType";

/**
 * Rights management DAP component config types.
 */
export type RightsManagementDapComponentConfig =
	| {
			type: typeof RightsManagementDapComponentType.Service;
			options?: IDataAccessPointServiceConstructorOptions & {
				negotiatorModulesConfig?: IEngineModuleConfig[];
			};
	  }
	| {
			type: typeof RightsManagementDapComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
