// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IMetricsCollectorServiceConstructorOptions } from "@twin.org/telemetry-service";
import type { MetricsCollectorComponentType } from "../types/metricsCollectorComponentType.js";

/**
 * Metrics collector component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MetricsCollectorComponentConfig = {
	type: typeof MetricsCollectorComponentType.Service;
	options?: IMetricsCollectorServiceConstructorOptions;
};
