// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Metrics producer component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
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
