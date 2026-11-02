// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageOrganizationServiceConstructorOptions } from "@3sixty/api-auth-account-service";
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { OrganizationComponentType } from "../types/organizationComponentType.js";

/**
 * Organization component config types.
 */
export type OrganizationComponentConfig =
	| {
			type: typeof OrganizationComponentType.EntityStorage;
			options?: IEntityStorageOrganizationServiceConstructorOptions;
	  }
	| {
			type: typeof OrganizationComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
