// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IExampleDataAccessHandlerConstructorOptions } from "@twin.org/rights-management-plugins";
import type { RightsManagementDataAccessHandlerComponentType } from "../types/rightsManagementDataAccessHandlerComponentType.js";

/**
 * Rights management data access handler component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RightsManagementDataAccessHandlerComponentConfig = {
	type: typeof RightsManagementDataAccessHandlerComponentType.Example;
	options?: IExampleDataAccessHandlerConstructorOptions;
};
