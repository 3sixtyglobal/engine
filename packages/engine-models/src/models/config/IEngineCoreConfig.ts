// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EngineLogLevel } from "../engineLogLevel.js";
import type { IEngineCoreTypeConfig } from "./IEngineCoreTypeConfig.js";
import type { IEngineFacadeConfig } from "./IEngineFacadeConfig.js";

/**
 * Configuration for the engine core.
 */
export interface IEngineCoreConfig {
	/**
	 * Start the engine in debug mode.
	 * @default false
	 */
	debug?: boolean;

	/**
	 * Disable output to the console.
	 * @default false
	 */
	silent?: boolean;

	/**
	 * The log level for the engine logger, takes precedence over silent when set.
	 * @default all
	 */
	logLevel?: EngineLogLevel;

	/**
	 * Disable colour in the engine logger output.
	 * @default false
	 */
	disableColor?: boolean;

	/**
	 * The components to disable output for.
	 */
	silentComponents?: {
		logging?: string[];
		telemetry?: string[];
		tracing?: string[];
	};

	/**
	 * The facades to activate, keyed by the type name of the factory they apply to.
	 */
	facades?: {
		[factoryTypeName: string]: IEngineFacadeConfig[];
	};

	/**
	 * The types to initialise in the engine.
	 */
	types: {
		[type: string]: IEngineCoreTypeConfig[] | undefined;
	};
}
