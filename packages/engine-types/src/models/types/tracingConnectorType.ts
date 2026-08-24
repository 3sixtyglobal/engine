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
	OpenTelemetry: "open-telemetry",

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
