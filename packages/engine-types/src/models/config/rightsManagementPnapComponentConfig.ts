// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IPolicyNegotiationAdminPointServiceConstructorOptions } from "@twin.org/rights-management-pnp-service";
import type { RightsManagementPnapComponentType } from "../types/rightsManagementPnapComponentType.js";

/**
 * Rights management PNAP component config types.
 */
export type RightsManagementPnapComponentConfig =
	| {
			type: typeof RightsManagementPnapComponentType.Service;
			options?: IPolicyNegotiationAdminPointServiceConstructorOptions;
	  }
	| {
			type: typeof RightsManagementPnapComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
