// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IEntityStorageServiceConstructorOptions } from "@twin.org/entity-storage-service";
import type { EntityStorageComponentType } from "../types/entityStorageComponentType.js";

/**
 * Entity storage component config types.
 */
export type EntityStorageComponentConfig =
	| {
			type: typeof EntityStorageComponentType.Service;
			options: IEntityStorageServiceConstructorOptions & {
				/**
				 * The context IDs to partition the data by, defaults to the node and tenant keys the engine has.
				 */
				partitionContextIds?: string[];
			};
	  }
	| {
			type: typeof EntityStorageComponentType.RestClient;
			options: IBaseRestClientConfig & {
				/**
				 * The type of the entity storage.
				 */
				entityStorageType: string;
			};
	  };
