// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * REST client processor types.
 */
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
