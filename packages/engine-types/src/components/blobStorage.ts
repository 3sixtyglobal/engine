// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { S3BlobStorageConnector } from "@twin.org/blob-storage-connector-aws-s3";
import { AzureBlobStorageConnector } from "@twin.org/blob-storage-connector-azure";
import { FileBlobStorageConnector } from "@twin.org/blob-storage-connector-file";
import { GcpBlobStorageConnector } from "@twin.org/blob-storage-connector-gcp";
import { IpfsBlobStorageConnector } from "@twin.org/blob-storage-connector-ipfs";
import { MemoryBlobStorageConnector } from "@twin.org/blob-storage-connector-memory";
import { BlobStorageConnectorFactory } from "@twin.org/blob-storage-models";
import { BlobStorageRestClient } from "@twin.org/blob-storage-rest-client";
import {
	BlobStorageService,
	initSchema as initSchemaBlobStorage,
	type BlobStorageEntry
} from "@twin.org/blob-storage-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent, Is } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { BlobStorageComponentConfig } from "../models/config/blobStorageComponentConfig.js";
import type { BlobStorageConnectorConfig } from "../models/config/blobStorageConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { BlobStorageComponentType } from "../models/types/blobStorageComponentType.js";
import { BlobStorageConnectorType } from "../models/types/blobStorageConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the blob storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseBlobStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BlobStorageConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof BlobStorageConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === BlobStorageConnectorType.Ipfs) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IpfsBlobStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						partitionContextIds: ContextIdHelper.pickKeysFromAvailable(
							engineCore.getContextIdKeys(),
							[ContextIdKeys.Node, ContextIdKeys.Tenant]
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = IpfsBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.File) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new FileBlobStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						partitionContextIds: ContextIdHelper.pickKeysFromAvailable(
							engineCore.getContextIdKeys(),
							[ContextIdKeys.Node, ContextIdKeys.Tenant]
						)
					},
					{
						config: {
							directory: Is.stringValue(createConfig?.options.storagePrefix)
								? path.join(
										createConfig.options.config.directory,
										createConfig.options.storagePrefix
									)
								: (createConfig.options.config.directory ?? "")
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = FileBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.Memory) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MemoryBlobStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						partitionContextIds: ContextIdHelper.pickKeysFromAvailable(
							engineCore.getContextIdKeys(),
							[ContextIdKeys.Node, ContextIdKeys.Tenant]
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = MemoryBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.AwsS3) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new S3BlobStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						partitionContextIds: ContextIdHelper.pickKeysFromAvailable(
							engineCore.getContextIdKeys(),
							[ContextIdKeys.Node, ContextIdKeys.Tenant]
						)
					},
					{
						config: {
							bucketName: createConfig
								? `${createConfig.options.storagePrefix ?? ""}${createConfig.options.config.bucketName}`
								: "",
							region: createConfig?.options.config.region ?? ""
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = S3BlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.GcpStorage) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new GcpBlobStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						partitionContextIds: ContextIdHelper.pickKeysFromAvailable(
							engineCore.getContextIdKeys(),
							[ContextIdKeys.Node, ContextIdKeys.Tenant]
						)
					},
					{
						config: {
							bucketName: createConfig
								? `${createConfig.options.storagePrefix ?? ""}${createConfig.options.config.bucketName}`
								: "",
							projectId: createConfig?.options.config.projectId ?? ""
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = GcpBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.AzureStorage) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AzureBlobStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						partitionContextIds: ContextIdHelper.pickKeysFromAvailable(
							engineCore.getContextIdKeys(),
							[ContextIdKeys.Node, ContextIdKeys.Tenant]
						),
						config: {
							containerName: createConfig
								? `${createConfig.options.storagePrefix ?? ""}${createConfig.options.config.containerName}`
								: "",
							accountName: createConfig?.options.config.accountName ?? "",
							accountKey: createConfig?.options.config.accountKey ?? ""
						}
					},
					createConfig.options
				)
			);
		instanceTypeName = AzureBlobStorageConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: BlobStorageConnectorFactory
	};
}

/**
 * Initialise the blob storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseBlobStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BlobStorageComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === BlobStorageComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaBlobStorage();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.entryEntityStorageType,
				nameof<BlobStorageEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new BlobStorageService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						telemetryComponentType:
							engineCore.getRegisteredInstanceTypeOptional("telemetryComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(BlobStorageService);
	} else if (instanceConfig.type === BlobStorageComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const mergedOptions = EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
				createConfig.options
			);
			return new BlobStorageRestClient(mergedOptions);
		};
		instanceTypeName = nameofKebabCase(BlobStorageRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
