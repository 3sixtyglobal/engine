// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITenantServiceConstructorOptions } from "@twin.org/api-tenant-processor";
import type { TenantComponentType } from "../types/tenantComponentType.js";

/**
 * Tenant component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TenantComponentConfig = {
	type: typeof TenantComponentType.Service;
	options?: ITenantServiceConstructorOptions;
};
