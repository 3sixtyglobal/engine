// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Metrics collector component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MetricsCollectorComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Metrics collector component types.
 */
export type MetricsCollectorComponentType =
	(typeof MetricsCollectorComponentType)[keyof typeof MetricsCollectorComponentType];
