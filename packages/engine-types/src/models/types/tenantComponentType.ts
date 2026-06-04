// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Tenant component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TenantComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Tenant component types.
 */
export type TenantComponentType = (typeof TenantComponentType)[keyof typeof TenantComponentType];
