// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IRightsManagementServiceConstructorOptions } from "@twin.org/rights-management-service";
import type { RightsManagementComponentType } from "../types/rightsManagementComponentType";

/**
 * Rights management component config types.
 */
export type RightsManagementComponentConfig =
	| {
			type: typeof RightsManagementComponentType.Service;
			options?: IRightsManagementServiceConstructorOptions;
	  }
	| {
			type: typeof RightsManagementComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
