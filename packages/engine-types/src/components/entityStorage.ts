// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import {
	ComponentFactory,
	GeneralError,
	I18n,
	type IComponent,
	Is,
	StringHelper
} from "@twin.org/core";
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
import { SynchronisedEntityStorageConnector } from "@twin.org/entity-storage-connector-synchronised";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import { EntityStorageRestClient } from "@twin.org/entity-storage-rest-client";
import { EntityStorageService } from "@twin.org/entity-storage-service";
import { nameofKebabCase } from "@twin.org/nameof";
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
 * @returns The name of the instance type that was created.
 * @throws GeneralError when the configuration is invalid.
 */
export function initialiseEntityStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	typeCustom: string | undefined,
	schema: string,
	partitionContextIds: string[]
): string {
	const instanceName = StringHelper.kebabCase(schema);

	if (!EntityStorageConnectorFactory.hasName(instanceName)) {
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

		const type = entityStorageConfig.type;
		let entityStorageConnector: IEntityStorageConnector;

		engineCore.logInfo(
			I18n.formatMessage("info.engineTypes.configuringEntityStorage", {
				element: "Entity Storage",
				storageName: instanceName,
				storageType: type
			})
		);

		if (type === EntityStorageConnectorType.Memory) {
			entityStorageConnector = new MemoryEntityStorageConnector({
				entitySchema: schema,
				partitionContextIds
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
				...entityStorageConfig.options,
				config: {
					...entityStorageConfig.options.config,
					tableName: `${entityStorageConfig.options.tablePrefix ?? ""}${instanceName}`
				}
			});
		} else if (type === EntityStorageConnectorType.Synchronised) {
			// Create the entity storage that is wrapped by the synchronised connector
			// by removing the custom type it will default to the standard storage
			// mechanism for entity storage
			const wrappedInstanceName = initialiseEntityStorageConnector(
				engineCore,
				context,
				undefined,
				schema,
				partitionContextIds
			);

			// Use the wrapped instance name as the entity storage connector type
			// for the synchronised connector
			entityStorageConnector = new SynchronisedEntityStorageConnector({
				entitySchema: schema,
				...entityStorageConfig.options,
				entityStorageConnectorType: wrappedInstanceName,
				eventBusComponentType: engineCore.getRegisteredInstanceType("eventBusComponent"),
				config: {
					...entityStorageConfig.options.config
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

	return instanceName;
}

/**
 * Initialise the entity storage connector.
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
				createConfig.options.partitionContextIds
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
