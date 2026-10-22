// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IDataProcessingServiceConstructorOptions } from "@3sixty/data-processing-service";
import type { DataProcessingComponentType } from "../types/dataProcessingComponentType.js";

/**
 * Data processing component config types.
 */
export type DataProcessingComponentConfig =
	| {
			type: typeof DataProcessingComponentType.Service;
			options?: IDataProcessingServiceConstructorOptions;
	  }
	| {
			type: typeof DataProcessingComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
