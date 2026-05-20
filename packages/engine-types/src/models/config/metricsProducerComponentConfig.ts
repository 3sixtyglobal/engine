// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IProcessMetricsProducerConstructorOptions,
	ISystemMetricsProducerConstructorOptions
} from "@twin.org/telemetry-producers";
import type { MetricsProducerComponentType } from "../types/metricsProducerComponentType.js";

/**
 * Metrics producer config types.
 */
export type MetricsProducerComponentConfig =
	| {
			type: typeof MetricsProducerComponentType.System;
			options?: ISystemMetricsProducerConstructorOptions;
	  }
	| {
			type: typeof MetricsProducerComponentType.Process;
			options: IProcessMetricsProducerConstructorOptions;
	  };
