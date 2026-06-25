// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IPolicyNegotiationPointServiceConstructorOptions } from "@twin.org/rights-management-pnp-service";
import type { RightsManagementPnpComponentType } from "../types/rightsManagementPnpComponentType.js";

/**
 * Rights management PNP component config types.
 */
export type RightsManagementPnpComponentConfig =
	| {
			type: typeof RightsManagementPnpComponentType.Service;
			options?: IPolicyNegotiationPointServiceConstructorOptions;
	  }
	| {
			type: typeof RightsManagementPnpComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
