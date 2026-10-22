// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IAuthorizationServiceConstructorOptions } from "@3sixty/authorization-service";
import type { AuthorizationComponentType } from "../types/authorizationComponentType.js";

/**
 * Authorization component configuration.
 */
export type AuthorizationComponentConfig =
	| {
			type: typeof AuthorizationComponentType.Service;
			options?: IAuthorizationServiceConstructorOptions;
	  }
	| {
			type: typeof AuthorizationComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
