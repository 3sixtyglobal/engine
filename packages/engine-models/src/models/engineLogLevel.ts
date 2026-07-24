// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The log levels for the engine logger.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EngineLogLevel = {
	/**
	 * No output.
	 */
	None: "none",

	/**
	 * Errors only.
	 */
	Error: "error",

	/**
	 * Warnings and errors.
	 */
	Warn: "warn",

	/**
	 * All output.
	 */
	All: "all"
} as const;

/**
 * The log levels for the engine logger.
 */
export type EngineLogLevel = (typeof EngineLogLevel)[keyof typeof EngineLogLevel];
