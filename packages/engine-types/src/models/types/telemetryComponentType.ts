// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Telemetry component types.
 */
export const TelemetryComponentType = {
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
 * Telemetry component types.
 */
export type TelemetryComponentType =
	(typeof TelemetryComponentType)[keyof typeof TelemetryComponentType];
