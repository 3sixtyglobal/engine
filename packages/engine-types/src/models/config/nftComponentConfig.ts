// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { INftServiceConstructorOptions } from "@3sixty/nft-service";
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
