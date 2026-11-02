// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationAccountServiceConstructorOptions } from "@3sixty/api-auth-account-service";
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { AuthenticationAccountComponentType } from "../types/authenticationAccountComponentType.js";

/**
 * Authentication account component config types.
 */
export type AuthenticationAccountComponentConfig =
	| {
			type: typeof AuthenticationAccountComponentType.EntityStorage;
			options?: IEntityStorageAuthenticationAccountServiceConstructorOptions;
	  }
	| {
			type: typeof AuthenticationAccountComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
