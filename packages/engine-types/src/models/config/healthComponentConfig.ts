// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IHealthServiceConstructorOptions } from "@twin.org/api-service";
import type { HealthComponentType } from "../types/healthComponentType.js";

/**
 * Health component config types.
 */
export type HealthComponentConfig =
	| {
			type: typeof HealthComponentType.Service;
			options?: IHealthServiceConstructorOptions;
	  }
	| {
			type: typeof HealthComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
