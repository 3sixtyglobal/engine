// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IIdentityResolverServiceConstructorOptions } from "@3sixty/identity-service";
import type { IdentityResolverComponentType } from "../types/identityResolverComponentType.js";

/**
 * Identity resolver component config types.
 */
export type IdentityResolverComponentConfig =
	| {
			type: typeof IdentityResolverComponentType.Service;
			options?: IIdentityResolverServiceConstructorOptions;
	  }
	| {
			type: typeof IdentityResolverComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
