// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { ITelemetryServiceConstructorOptions } from "@3sixty/telemetry-service";
import type { TelemetryComponentType } from "../types/telemetryComponentType.js";

/**
 * Telemetry component config types.
 */
export type TelemetryComponentConfig =
	| {
			type: typeof TelemetryComponentType.Service;
			options?: ITelemetryServiceConstructorOptions;
	  }
	| {
			type: typeof TelemetryComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
