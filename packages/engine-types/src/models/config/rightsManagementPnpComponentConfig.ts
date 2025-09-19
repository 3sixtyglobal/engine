// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IEngineModuleConfig } from "@twin.org/engine-models";
import type { IPolicyNegotiationPointServiceConstructorOptions } from "@twin.org/rights-management-pnp-service";
import type { RightsManagementPnpComponentType } from "../types/rightsManagementPnpComponentType";

/**
 * Rights management PNP component config types.
 */
export type RightsManagementPnpComponentConfig =
	| {
			type: typeof RightsManagementPnpComponentType.Service;
			options: IPolicyNegotiationPointServiceConstructorOptions & {
				negotiatorModulesConfig?: IEngineModuleConfig[];
				requesterModulesConfig?: IEngineModuleConfig[];
			};
	  }
	| {
			type: typeof RightsManagementPnpComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
