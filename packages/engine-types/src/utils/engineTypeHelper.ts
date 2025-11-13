// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@twin.org/core";
import type { IEngineCoreTypeBaseConfig, IEngineCoreTypeConfig } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { IEngineConfig } from "../models/IEngineConfig.js";

/**
 * Helper methods for engine config types.
 */
export class EngineTypeHelper {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<EngineTypeHelper>();

	/**
	 * Get the config for the specified component and type.
	 * @param engineConfig The engine configuration.
	 * @param component The component name.
	 * @param type The type name.
	 * @returns The config for the specified component and type or undefined if it does not exist.
	 */
	public static getConfigOfType<T extends IEngineCoreTypeBaseConfig>(
		engineConfig: IEngineConfig,
		component: string,
		type: string
	): IEngineCoreTypeConfig<T> | undefined {
		if (Is.empty(engineConfig.types[component])) {
			return undefined;
		}
		// First look for any of the specific type marked as default
		let foundConfig = engineConfig.types[component]?.find(
			config => config.type === type && config.isDefault
		);

		// If we found a default config then return that otherwise return the first matching type
		if (Is.empty(foundConfig)) {
			foundConfig = engineConfig.types[component]?.find(config => config.type === type);
		}

		return foundConfig as IEngineCoreTypeConfig<T>;
	}
}
