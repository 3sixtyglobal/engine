// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Tenant admin component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TenantAdminComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Tenant admin component types.
 */
export type TenantAdminComponentType =
	(typeof TenantAdminComponentType)[keyof typeof TenantAdminComponentType];
