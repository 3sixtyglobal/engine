// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EngineTypeInitialiserReturn, IEngineCoreTypeConfig } from "@3sixty/engine-models";

/**
 * A type which has been resolved by its initialiser but not yet constructed.
 * @internal
 */
export interface IEngineCoreResolvedType {
	/**
	 * The key of the type in the engine config.
	 */
	typeKey: string;

	/**
	 * The config entry the instance is created from.
	 */
	typeConfig: IEngineCoreTypeConfig;

	/**
	 * What the initialiser returned for the entry.
	 */
	result: EngineTypeInitialiserReturn;

	/**
	 * The instance type the component is registered under.
	 */
	finalInstanceType: string;
}
