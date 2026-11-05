// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Metrics producer component types.
 */
export const MetricsProducerComponentType = {
	/**
	 * System.
	 */
	System: "system",

	/**
	 * Process.
	 */
	Process: "process"
} as const;

/**
 * Metrics producer component types.
 */
export type MetricsProducerComponentType =
	(typeof MetricsProducerComponentType)[keyof typeof MetricsProducerComponentType];
