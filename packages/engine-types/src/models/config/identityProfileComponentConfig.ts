// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IIdentityProfileServiceConstructorOptions } from "@twin.org/identity-service";
import type { IdentityProfileComponentType } from "../types/identityProfileComponentType.js";

/**
 * Identity profile component config types.
 */
export type IdentityProfileComponentConfig =
	| {
			type: typeof IdentityProfileComponentType.Service;
			options?: IIdentityProfileServiceConstructorOptions;
	  }
	| {
			type: typeof IdentityProfileComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
