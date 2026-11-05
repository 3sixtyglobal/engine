// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Tracing component types.
 */
export const TracingComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Tracing component types.
 */
export type TracingComponentType = (typeof TracingComponentType)[keyof typeof TracingComponentType];
