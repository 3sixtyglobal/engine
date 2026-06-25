// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Context Id Handler types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ContextIdHandlerComponentType = {
	/**
	 * Did.
	 */
	Did: "Did",

	/**
	 * Tenant.
	 */
	Tenant: "Tenant"
} as const;

/**
 * Context Id Handler component types.
 */
export type ContextIdHandlerComponentType =
	(typeof ContextIdHandlerComponentType)[keyof typeof ContextIdHandlerComponentType];
