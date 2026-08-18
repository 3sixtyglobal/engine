// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * REST client processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RestClientProcessorType = {
	/**
	 * Tracing.
	 */
	Tracing: "tracing"
} as const;

/**
 * REST client processor types.
 */
export type RestClientProcessorType =
	(typeof RestClientProcessorType)[keyof typeof RestClientProcessorType];
