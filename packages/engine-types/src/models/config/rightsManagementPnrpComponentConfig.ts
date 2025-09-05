// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPolicyNegotiationRequestPointServiceConstructorOptions } from "@twin.org/rights-management-pnp-service";
import type { RightsManagementPnrpComponentType } from "../types/rightsManagementPnrpComponentType";

/**
 * Rights management PNRP component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementPnrpComponentConfig = {
	type: typeof RightsManagementPnrpComponentType.Service;
	options: IPolicyNegotiationRequestPointServiceConstructorOptions;
};
