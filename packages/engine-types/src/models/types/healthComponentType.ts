// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Health component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HealthComponentType = {
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
 * Health component types.
 */
export type HealthComponentType = (typeof HealthComponentType)[keyof typeof HealthComponentType];
