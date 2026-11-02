// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationAccountAdminServiceConstructorOptions } from "@3sixty/api-auth-account-service";
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { AuthenticationAccountAdminComponentType } from "../types/authenticationAccountAdminComponentType.js";

/**
 * Authentication account admin component config types.
 */
export type AuthenticationAccountAdminComponentConfig =
	| {
			type: typeof AuthenticationAccountAdminComponentType.EntityStorage;
			options?: IEntityStorageAuthenticationAccountAdminServiceConstructorOptions;
	  }
	| {
			type: typeof AuthenticationAccountAdminComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
