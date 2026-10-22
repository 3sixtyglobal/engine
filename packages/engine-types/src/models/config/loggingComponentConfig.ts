// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { ILoggingServiceConstructorOptions } from "@3sixty/logging-service";
import type { LoggingComponentType } from "../types/loggingComponentType.js";

/**
 * Logging component config types.
 */
export type LoggingComponentConfig =
	| {
			type: typeof LoggingComponentType.Service;
			options?: ILoggingServiceConstructorOptions;
	  }
	| {
			type: typeof LoggingComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
