// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Tracing connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TracingConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * OpenTelemetry.
	 */
	OpenTelemetry: "open-telemetry"
} as const;

/**
 * Tracing connector types.
 */
export type TracingConnectorType = (typeof TracingConnectorType)[keyof typeof TracingConnectorType];
