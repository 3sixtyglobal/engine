// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * A facade to activate on a factory.
 */
export interface IEngineFacadeConfig {
	/**
	 * The name of the facade, as registered with the facade factory.
	 */
	name: string;

	/**
	 * Patterns matching the instance types the facade is not applied to.
	 */
	excludeTypes?: string[];
}
