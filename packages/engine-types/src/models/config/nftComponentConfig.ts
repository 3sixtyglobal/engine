// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { INftServiceConstructorOptions } from "@twin.org/nft-service";
import type { NftComponentType } from "../types/nftComponentType.js";

/**
 * NFT component config types.
 */
export type NftComponentConfig =
	| {
			type: typeof NftComponentType.Service;
			options?: INftServiceConstructorOptions;
	  }
	| {
			type: typeof NftComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
