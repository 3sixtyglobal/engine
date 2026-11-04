// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IFeatureServiceConstructorOptions } from "@3sixty/api-auth-service";
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { FeatureComponentType } from "../types/featureComponentType.js";

/**
 * Feature component config types.
 */
export type FeatureComponentConfig =
	| {
			type: typeof FeatureComponentType.Service;
			options?: IFeatureServiceConstructorOptions;
	  }
	| {
			type: typeof FeatureComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
