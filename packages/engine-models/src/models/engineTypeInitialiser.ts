// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { Factory, IComponent } from "@twin.org/core";
import type { IEngineCoreTypeBaseConfig } from "./config/IEngineCoreTypeBaseConfig.js";
import type { IEngineCore } from "./IEngineCore.js";
import type { IEngineCoreContext } from "./IEngineCoreContext.js";

/**
 * Method definition for the engine type initialiser.
 */
export type EngineTypeInitialiser<
	T extends IEngineCoreTypeBaseConfig = IEngineCoreTypeBaseConfig,
	F = Factory<unknown>
> = (
	engineCore: IEngineCore,
	context: IEngineCoreContext,
	instanceConfig: T
) => EngineTypeInitialiserReturn<T, F>;

/**
 * Engine type initialiser return type.
 */
export interface EngineTypeInitialiserReturn<
	T extends IEngineCoreTypeBaseConfig = IEngineCoreTypeBaseConfig,
	F = Factory<unknown>
> {
	/**
	 * The instance type created.
	 */
	instanceTypeName?: string;

	/**
	 * The factory to store the instance in.
	 */
	factory?: F;

	/**
	 * Create a new component.
	 */
	createComponent?: (additionalConfig: T) => IComponent;
}
