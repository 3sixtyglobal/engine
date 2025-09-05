// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Is } from "@twin.org/core";
import type { IEngineCore, IEngineModuleConfig } from "@twin.org/engine-models";
import { ModuleHelper } from "@twin.org/modules";
import { nameof } from "@twin.org/nameof";

/**
 * Helper class for engine modules.
 */
export class EngineModuleHelper {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<EngineModuleHelper>();

	/**
	 * Loads an engine component and constructs it with the relevant dependencies and configuration.
	 * @param engineCore The engine core.
	 * @param engineModuleConfig The configuration for the module.
	 * @returns The instantiated component.
	 */
	public static async loadComponent<T>(
		engineCore: IEngineCore,
		engineModuleConfig: IEngineModuleConfig
	): Promise<T> {
		const moduleClass = await ModuleHelper.getModuleEntry(
			engineModuleConfig.moduleName,
			engineModuleConfig.className
		);

		const isClass = Is.class(moduleClass);
		if (!isClass) {
			throw new GeneralError(EngineModuleHelper.CLASS_NAME, "moduleNotClass", {
				moduleName: engineModuleConfig.moduleName,
				className: engineModuleConfig.className
			});
		}

		const constructorOptions: { [key: string]: unknown } = {};

		if (Is.arrayValue(engineModuleConfig.dependencies)) {
			for (const dependency of engineModuleConfig.dependencies) {
				if (dependency.isOptional ?? false) {
					constructorOptions[dependency.propertyName] = engineCore.getRegisteredInstanceType(
						dependency.componentName,
						dependency.features
					);
				} else {
					constructorOptions[dependency.propertyName] =
						engineCore.getRegisteredInstanceTypeOptional(
							dependency.componentName,
							dependency.features
						);
				}
			}
		}

		if (Is.object(engineModuleConfig.config)) {
			constructorOptions.config = engineModuleConfig.config;
		}

		return new moduleClass(constructorOptions) as T;
	}
}
