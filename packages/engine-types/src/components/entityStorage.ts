// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, GeneralError, type IComponent, Is, StringHelper } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { CosmosDbEntityStorageConnector } from "@twin.org/entity-storage-connector-cosmosdb";
import { DynamoDbEntityStorageConnector } from "@twin.org/entity-storage-connector-dynamodb";
import { FileEntityStorageConnector } from "@twin.org/entity-storage-connector-file";
import { FirestoreEntityStorageConnector } from "@twin.org/entity-storage-connector-gcp-firestore";
import { MemoryEntityStorageConnector } from "@twin.org/entity-storage-connector-memory";
import { MongoDbEntityStorageConnector } from "@twin.org/entity-storage-connector-mongodb";
import { MySqlEntityStorageConnector } from "@twin.org/entity-storage-connector-mysql";
import { PostgreSqlEntityStorageConnector } from "@twin.org/entity-storage-connector-postgresql";
import { ScyllaDBTableConnector } from "@twin.org/entity-storage-connector-scylladb";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import { EntityStorageRestClient } from "@twin.org/entity-storage-rest-client";
import { EntityStorageService } from "@twin.org/entity-storage-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { EntityStorageComponentConfig } from "../models/config/entityStorageComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { EntityStorageComponentType } from "../models/types/entityStorageComponentType.js";
import { EntityStorageConnectorType } from "../models/types/entityStorageConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the entity storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param typeCustom Override the type of connector to use instead of default configuration.
 * @param schema The schema for the entity storage.
 * @param partitionContextIds The context IDs to use for partitioning the data.
 * @throws GeneralError when the configuration is invalid.
 */
export function initialiseEntityStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	typeCustom: string | undefined,
	schema: string,
	partitionContextIds: string[]
): void {
	const kebabName = StringHelper.kebabCase(schema);
	let instanceName = kebabName;

	let entityStorageConfig;

	if (Is.stringValue(typeCustom)) {
		// A custom type has been specified, so look it up
		entityStorageConfig = context.config.types.entityStorageConnector?.find(
			c => c.type === typeCustom || c.overrideInstanceType === typeCustom
		);
		if (Is.empty(entityStorageConfig)) {
			throw new GeneralError("engineTypes", "entityStorageCustomMissing", {
				typeCustom,
				storageName: instanceName
			});
		}

		// Since we have a custom type we need to use that as the instance name for the
		// connector so that it can be looked up by other components
		instanceName = typeCustom;
	} else {
		// The default entity storage method is either the one with the isDefault flag set
		// or pick the first one if no default is set.
		entityStorageConfig =
			context.config.types.entityStorageConnector?.find(c => c.isDefault ?? false) ??
			context.config.types.entityStorageConnector?.[0];
		if (Is.empty(entityStorageConfig)) {
			throw new GeneralError("engineTypes", "entityStorageMissing", {
				storageName: instanceName
			});
		}
	}

	if (!EntityStorageConnectorFactory.hasName(instanceName)) {
		const type = entityStorageConfig.type;
		let entityStorageConnector: IEntityStorageConnector;

		if (type === EntityStorageConnectorType.Memory) {
			entityStorageConnector = new MemoryEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					storageKey: `${entityStorageConfig.options.storagePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.File) {
			entityStorageConnector = new FileEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					directory: path.join(
						entityStorageConfig.options.config.directory,
						`${entityStorageConfig.options.folderPrefix ?? ""}${instanceName}`
					)
				}
			});
		} else if (type === EntityStorageConnectorType.AwsDynamoDb) {
			entityStorageConnector = new DynamoDbEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				loggingComponentType: engineCore.getRegisteredSilencedType(
					"logging",
					nameof(DynamoDbEntityStorageConnector)
				),
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.AzureCosmosDb) {
			entityStorageConnector = new CosmosDbEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				loggingComponentType: engineCore.getRegisteredSilencedType(
					"logging",
					nameof(CosmosDbEntityStorageConnector)
				),
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					containerId: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.GcpFirestoreDb) {
			entityStorageConnector = new FirestoreEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				loggingComponentType: engineCore.getRegisteredSilencedType(
					"logging",
					nameof(FirestoreEntityStorageConnector)
				),
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					collectionName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.ScyllaDb) {
			entityStorageConnector = new ScyllaDBTableConnector({
				entitySchema: schema,
				partitionContextIds,
				loggingComponentType: engineCore.getRegisteredSilencedType(
					"logging",
					nameof(ScyllaDBTableConnector)
				),
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.MySqlDb) {
			entityStorageConnector = new MySqlEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				loggingComponentType: engineCore.getRegisteredSilencedType(
					"logging",
					nameof(MySqlEntityStorageConnector)
				),
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.MongoDb) {
			entityStorageConnector = new MongoDbEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				loggingComponentType: engineCore.getRegisteredSilencedType(
					"logging",
					nameof(MongoDbEntityStorageConnector)
				),
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					collection: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.PostgreSql) {
			entityStorageConnector = new PostgreSqlEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds,
				loggingComponentType: engineCore.getRegisteredSilencedType(
					"logging",
					nameof(PostgreSqlEntityStorageConnector)
				),
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else {
			throw new GeneralError("engineTypes", "connectorUnknownType", {
				type,
				connectorType: "entityStorageConnector"
			});
		}

		context.componentInstances.push({
			instanceType: instanceName,
			component: entityStorageConnector,
			initialised: false
		});
		EntityStorageConnectorFactory.register(instanceName, () => entityStorageConnector);
	}
}

/**
 * Initialise the entity storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseEntityStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: EntityStorageComponentConfig
): EngineTypeInitialiserReturn<EntityStorageComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === EntityStorageComponentType.Service) {
		const kebabName = StringHelper.kebabCase(instanceConfig.options.entityStorageType);
		createComponent = (createConfig: typeof instanceConfig) => {
			// See if there is a custom entity storage for this type, otherwise just use the default one.
			const hasCustom = context.config.types.entityStorageConnector?.some(
				c => c.type === kebabName || c.overrideInstanceType === kebabName
			);

			initialiseEntityStorageConnector(
				engineCore,
				context,
				hasCustom ? kebabName : undefined,
				createConfig.options.entityStorageType,
				createConfig.options.partitionContextIds ??
					ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
						ContextIdKeys.Node,
						ContextIdKeys.Tenant
					])
			);

			return new EntityStorageService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options, {
					entityStorageType: kebabName
				})
			);
		};
		instanceTypeName = kebabName;
	} else if (instanceConfig.type === EntityStorageComponentType.RestClient) {
		const kebabName = StringHelper.kebabCase(instanceConfig.options.entityStorageType);
		createComponent = (createConfig: typeof instanceConfig) =>
			new EntityStorageRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options, {
					pathPrefix: kebabName
				})
			);
		instanceTypeName = `${nameofKebabCase(EntityStorageRestClient)}-${kebabName}`;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
