// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IEngineModuleConfig } from "@twin.org/engine-models";
import type { IPolicyEnforcementPointServiceConstructorOptions } from "@twin.org/rights-management-pep-service";
import type { RightsManagementPepComponentType } from "../types/rightsManagementPepComponentType";

/**
 * Rights management PEP component config types.
 */
export type RightsManagementPepComponentConfig =
	| {
			type: typeof RightsManagementPepComponentType.Service;
			options?: IPolicyEnforcementPointServiceConstructorOptions & {
				processorModulesConfig?: IEngineModuleConfig[];
			};
	  }
	| {
			type: typeof RightsManagementPepComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
