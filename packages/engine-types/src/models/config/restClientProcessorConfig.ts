// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITracingRestClientProcessorConstructorOptions } from "@twin.org/tracing-processors";
import type { RestClientProcessorType } from "../types/restClientProcessorType.js";

/**
 * REST client processor config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RestClientProcessorConfig = {
	type: typeof RestClientProcessorType.Tracing;
	options?: ITracingRestClientProcessorConstructorOptions;
};
