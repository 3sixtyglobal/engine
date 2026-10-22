// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IS3BlobStorageConnectorConstructorOptions } from "@3sixty/blob-storage-connector-aws-s3";
import type { IAzureBlobStorageConnectorConstructorOptions } from "@3sixty/blob-storage-connector-azure";
import type { IFileBlobStorageConnectorConstructorOptions } from "@3sixty/blob-storage-connector-file";
import type { IGcpBlobStorageConnectorConstructorOptions } from "@3sixty/blob-storage-connector-gcp";
import type { IIpfsBlobStorageConnectorConstructorOptions } from "@3sixty/blob-storage-connector-ipfs";
import type { IMemoryStorageConnectorConstructorOptions } from "@3sixty/blob-storage-connector-memory";
import type { BlobStorageConnectorType } from "../types/blobStorageConnectorType.js";

/**
 * Blob storage connector config types.
 */
export type BlobStorageConnectorConfig =
	| {
			type: typeof BlobStorageConnectorType.File;
			options: IFileBlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.Memory;
			options?: IMemoryStorageConnectorConstructorOptions;
	  }
	| {
			type: typeof BlobStorageConnectorType.AwsS3;
			options: IS3BlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.AzureStorage;
			options: IAzureBlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.GcpStorage;
			options: IGcpBlobStorageConnectorConstructorOptions & {
				storagePrefix?: string;
			};
	  }
	| {
			type: typeof BlobStorageConnectorType.Ipfs;
			options: IIpfsBlobStorageConnectorConstructorOptions;
	  };
