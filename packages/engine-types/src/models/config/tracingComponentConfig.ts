// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { ITracingServiceConstructorOptions } from "@3sixty/tracing-service";
import type { TracingComponentType } from "../types/tracingComponentType.js";

/**
 * Tracing component config types.
 */
export type TracingComponentConfig =
	| {
			type: typeof TracingComponentType.Service;
			options?: ITracingServiceConstructorOptions;
	  }
	| {
			type: typeof TracingComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
