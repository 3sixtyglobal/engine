// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreTypeBaseConfig } from "./IEngineCoreTypeBaseConfig.js";

/**
 * Configuration for the engine core type.
 */
export type IEngineCoreTypeConfig<T extends IEngineCoreTypeBaseConfig = IEngineCoreTypeBaseConfig> =
	T & {
		/**
		 * The instance type to override with.
		 */
		overrideInstanceType?: string;

		/**
		 * Whether this is the default instance.
		 */
		isDefault?: boolean;

		/**
		 * The features supported by this instance.
		 */
		features?: string[];

		/**
		 * The path for the REST API.
		 */
		restPath?: string;

		/**
		 * The options for the REST API route generation.
		 */
		restOptions?: unknown;

		/**
		 * The path for the socket API.
		 */
		socketPath?: string;

		/**
		 * The options for the socket API route generation.
		 */
		socketOptions?: unknown;
	};
