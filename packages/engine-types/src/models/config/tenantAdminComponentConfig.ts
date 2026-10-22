// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITenantAdminServiceConstructorOptions } from "@3sixty/api-tenant-processor";
import type { TenantAdminComponentType } from "../types/tenantAdminComponentType.js";

/**
 * Tenant admin component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TenantAdminComponentConfig = {
	type: typeof TenantAdminComponentType.Service;
	options?: ITenantAdminServiceConstructorOptions;
};
