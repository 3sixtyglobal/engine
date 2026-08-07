// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Tracing component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
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
