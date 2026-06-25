// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ISchemaVersionServiceConstructorOptions } from "@twin.org/entity-storage-service";
import type { SchemaVersionMigrationComponentType } from "../types/schemaVersionMigrationComponentType.js";

/**
 * Schema version migration component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SchemaVersionMigrationComponentConfig = {
	type: typeof SchemaVersionMigrationComponentType.Service;
	options?: ISchemaVersionServiceConstructorOptions;
};
