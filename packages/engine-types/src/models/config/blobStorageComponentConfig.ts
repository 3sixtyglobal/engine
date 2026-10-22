// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IBlobStorageServiceConstructorOptions } from "@3sixty/blob-storage-service";
import type { BlobStorageComponentType } from "../types/blobStorageComponentType.js";

/**
 * Blob storage component config types.
 */
export type BlobStorageComponentConfig =
	| {
			type: typeof BlobStorageComponentType.Service;
			options?: IBlobStorageServiceConstructorOptions;
	  }
	| {
			type: typeof BlobStorageComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
