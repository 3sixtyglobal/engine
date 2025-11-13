// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { S3BlobStorageConnector } from "@twin.org/blob-storage-connector-aws-s3";
import { AzureBlobStorageConnector } from "@twin.org/blob-storage-connector-azure";
import { FileBlobStorageConnector } from "@twin.org/blob-storage-connector-file";
import { GcpBlobStorageConnector } from "@twin.org/blob-storage-connector-gcp";
import { IpfsBlobStorageConnector } from "@twin.org/blob-storage-connector-ipfs";
import { MemoryBlobStorageConnector } from "@twin.org/blob-storage-connector-memory";
import {
	BlobStorageConnectorFactory,
	type IBlobStorageComponent,
	type IBlobStorageConnector
} from "@twin.org/blob-storage-models";
import { BlobStorageRestClient } from "@twin.org/blob-storage-rest-client";
import {
	BlobStorageService,
	initSchema as initSchemaBlobStorage,
	type BlobStorageEntry
} from "@twin.org/blob-storage-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { Is, type IComponent, ComponentFactory } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { BlobStorageComponentConfig } from "../models/config/blobStorageComponentConfig.js";
import type { BlobStorageConnectorConfig } from "../models/config/blobStorageConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { BlobStorageComponentType } from "../models/types/blobStorageComponentType.js";
import { BlobStorageConnectorType } from "../models/types/blobStorageConnectorType.js";

/**
 * Initialise the blob storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseBlobStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BlobStorageConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof BlobStorageConnectorFactory;
	component?: IComponent;
}> {
	let component: IBlobStorageConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === BlobStorageConnectorType.Ipfs) {
		component = new IpfsBlobStorageConnector({
			partitionContextIds: ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			]),
			...instanceConfig.options
		});
		instanceType = IpfsBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.File) {
		component = new FileBlobStorageConnector({
			partitionContextIds: ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			]),
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				directory: Is.stringValue(instanceConfig.options.storagePrefix)
					? path.join(instanceConfig.options.config.directory, instanceConfig.options.storagePrefix)
					: instanceConfig.options.config.directory
			}
		});
		instanceType = FileBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.Memory) {
		component = new MemoryBlobStorageConnector({
			partitionContextIds: ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		});
		instanceType = MemoryBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.AwsS3) {
		component = new S3BlobStorageConnector({
			partitionContextIds: ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			]),
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				bucketName: `${instanceConfig.options.storagePrefix ?? ""}${instanceConfig.options.config.bucketName}`
			}
		});
		instanceType = S3BlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.GcpStorage) {
		component = new GcpBlobStorageConnector({
			partitionContextIds: ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			]),
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				bucketName: `${instanceConfig.options.storagePrefix ?? ""}${instanceConfig.options.config.bucketName}`
			}
		});
		instanceType = GcpBlobStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === BlobStorageConnectorType.AzureStorage) {
		component = new AzureBlobStorageConnector({
			partitionContextIds: ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			]),
			...instanceConfig.options,
			config: {
				...instanceConfig.options.config,
				containerName: `${instanceConfig.options.storagePrefix ?? ""}${instanceConfig.options.config.containerName}`
			}
		});
		instanceType = AzureBlobStorageConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
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
export async function initialiseBlobStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BlobStorageComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IBlobStorageComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === BlobStorageComponentType.Service) {
		initSchemaBlobStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.entryEntityStorageType,
			nameof<BlobStorageEntry>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);

		component = new BlobStorageService({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(BlobStorageService);
	} else if (instanceConfig.type === BlobStorageComponentType.RestClient) {
		component = new BlobStorageRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(BlobStorageRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
