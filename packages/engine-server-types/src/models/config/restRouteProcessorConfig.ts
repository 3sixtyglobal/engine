// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthHeaderProcessorConstructorOptions } from "@twin.org/api-auth-entity-storage-service";
import type {
	ILoggingProcessorConstructorOptions,
	IRestRouteProcessorConstructorOptions,
	IStaticUserIdentityProcessorConstructorOptions
} from "@twin.org/api-processors";
import type { IVerifiableCredentialAuthenticationProcessorConstructorOptions } from "@twin.org/identity-authentication";
import type { RestRouteProcessorType } from "../types/restRouteProcessorType";

/**
 * REST route processor config types.
 */
export type RestRouteProcessorConfig =
	| {
			type: typeof RestRouteProcessorType.AuthHeader;
			options?: IAuthHeaderProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.AuthVerifiableCredential;
			options?: IVerifiableCredentialAuthenticationProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.Logging;
			options?: ILoggingProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.NodeIdentity;
			options?: never;
	  }
	| {
			type: typeof RestRouteProcessorType.StaticUserIdentity;
			options: IStaticUserIdentityProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.RestRoute;
			options?: IRestRouteProcessorConstructorOptions;
	  };
