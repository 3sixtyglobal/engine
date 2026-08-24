// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { ITracingServiceConstructorOptions } from "@twin.org/tracing-service";
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
