// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import {
	type SchemaVersion,
	SchemaVersionService,
	initSchema
} from "@3sixty/entity-storage-service";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { SchemaVersionMigrationComponentConfig } from "../models/config/schemaVersionMigrationComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { SchemaVersionMigrationComponentType } from "../models/types/schemaVersionMigrationComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the schema version migration component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseSchemaVersionMigrationComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: SchemaVersionMigrationComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === SchemaVersionMigrationComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();

			// No partition keys ([] not [Node]) schema versions track
			// entity type structure globally - there is no per-context versioning and no scenario
			// where migrations should read from a different connector than the rest of entity storage.
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.schemaVersionStorageType,
				nameof<SchemaVersion>(),
				[]
			);
			return new SchemaVersionService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = nameofKebabCase(SchemaVersionService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
