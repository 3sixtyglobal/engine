// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IPolicyAdministrationPointServiceConstructorOptions } from "@twin.org/rights-management-pap-service";
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
