// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IVerifiableStorageServiceConstructorOptions } from "@twin.org/verifiable-storage-service";
import type { VerifiableStorageComponentType } from "../types/verifiableStorageComponentType.js";

/**
 * Verifiable storage component config types.
 */
export type VerifiableStorageComponentConfig =
	| {
			type: typeof VerifiableStorageComponentType.Service;
			options?: IVerifiableStorageServiceConstructorOptions;
	  }
	| {
			type: typeof VerifiableStorageComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
