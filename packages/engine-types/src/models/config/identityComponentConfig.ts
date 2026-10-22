// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IIdentityServiceConstructorOptions } from "@3sixty/identity-service";
import type { IdentityComponentType } from "../types/identityComponentType.js";

/**
 * Identity component config types.
 */
export type IdentityComponentConfig =
	| {
			type: typeof IdentityComponentType.Service;
			options?: IIdentityServiceConstructorOptions;
	  }
	| {
			type: typeof IdentityComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
