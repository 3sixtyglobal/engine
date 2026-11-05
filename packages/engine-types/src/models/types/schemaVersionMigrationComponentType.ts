// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Schema version migration component types.
 */
export const SchemaVersionMigrationComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Schema version migration component types.
 */
export type SchemaVersionMigrationComponentType =
	(typeof SchemaVersionMigrationComponentType)[keyof typeof SchemaVersionMigrationComponentType];
