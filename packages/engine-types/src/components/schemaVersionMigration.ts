// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector,
	SchemaVersion,
	SchemaVersionService,
	initSchema
} from "@twin.org/entity-storage-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { SchemaVersionMigrationComponentConfig } from "../models/config/schemaVersionMigrationComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";

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
	const createComponent = (): IComponent => {
		initSchema();
		// No partition keys ([] not [Node]) and no storage-type override: schema versions track
		// entity type structure globally — there is no per-context versioning and no scenario
		// where migrations should read from a different connector than the rest of entity storage.
		initialiseEntityStorageConnector(engineCore, context, undefined, nameof<SchemaVersion>(), []);
		const versionConnector = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<SchemaVersion>
		>(nameofKebabCase(SchemaVersion));
		return new SchemaVersionService(versionConnector);
	};

	return {
		createComponent,
		instanceTypeName: nameofKebabCase(SchemaVersionService),
		factory: ComponentFactory
	};
}
