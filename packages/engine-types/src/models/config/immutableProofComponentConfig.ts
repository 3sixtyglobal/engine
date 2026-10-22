// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IImmutableProofServiceConstructorOptions } from "@3sixty/immutable-proof-service";
import type { ImmutableProofComponentType } from "../types/immutableProofComponentType.js";

/**
 * Immutable proof component config types.
 */
export type ImmutableProofComponentConfig =
	| {
			type: typeof ImmutableProofComponentType.Service;
			options?: IImmutableProofServiceConstructorOptions;
	  }
	| {
			type: typeof ImmutableProofComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
