// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IPolicyAdministrationPointServiceConstructorOptions } from "@3sixty/rights-management-pap-service";
import type { RightsManagementPapComponentType } from "../types/rightsManagementPapComponentType.js";

/**
 * Rights management PAP component config types.
 */
export type RightsManagementPapComponentConfig =
	| {
			type: typeof RightsManagementPapComponentType.Service;
			options?: IPolicyAdministrationPointServiceConstructorOptions;
	  }
	| {
			type: typeof RightsManagementPapComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
