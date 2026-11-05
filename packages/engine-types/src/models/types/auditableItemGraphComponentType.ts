// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Auditable item graph component types.
 */
export const AuditableItemGraphComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Auditable item graph component types.
 */
export type AuditableItemGraphComponentType =
	(typeof AuditableItemGraphComponentType)[keyof typeof AuditableItemGraphComponentType];
