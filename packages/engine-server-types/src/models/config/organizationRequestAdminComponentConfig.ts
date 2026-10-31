// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageOrganizationRequestAdminServiceConstructorOptions } from "@3sixty/api-auth-account-service";
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { OrganizationRequestAdminComponentType } from "../types/organizationRequestAdminComponentType.js";

/**
 * Organization request admin component config types.
 */
export type OrganizationRequestAdminComponentConfig =
	| {
			type: typeof OrganizationRequestAdminComponentType.EntityStorage;
			options?: IEntityStorageOrganizationRequestAdminServiceConstructorOptions;
	  }
	| {
			type: typeof OrganizationRequestAdminComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
