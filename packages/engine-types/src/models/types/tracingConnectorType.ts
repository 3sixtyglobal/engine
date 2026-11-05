// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Tracing connector types.
 */
export const TracingConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * OpenTelemetry.
	 */
	OpenTelemetry: "open-telemetry",

	/**
	 * Console for logging traces to the console.
	 */
	Console: "console",

	/**
	 * Multi combines other telemetry connectors.
	 */
	Multi: "multi",

	/**
	 * Silent for a noop connector.
	 */
	Silent: "silent"
} as const;

/**
 * Tracing connector types.
 */
export type TracingConnectorType = (typeof TracingConnectorType)[keyof typeof TracingConnectorType];
