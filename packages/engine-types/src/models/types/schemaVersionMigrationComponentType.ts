// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Schema version migration component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
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
