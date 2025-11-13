// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { ISynchronisedStorageServiceConstructorOptions } from "@twin.org/synchronised-storage-service";
import type { SynchronisedStorageComponentType } from "../types/synchronisedStorageComponentType.js";

/**
 * Synchronised storage component config types.
 */
export type SynchronisedStorageComponentConfig =
	| {
			type: typeof SynchronisedStorageComponentType.Service;
			options: ISynchronisedStorageServiceConstructorOptions;
	  }
	| {
			type: typeof SynchronisedStorageComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
