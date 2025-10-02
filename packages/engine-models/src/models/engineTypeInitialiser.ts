// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { Factory, IComponent } from "@twin.org/core";
import type { IEngineCoreTypeBaseConfig } from "./config/IEngineCoreTypeBaseConfig";
import type { IEngineCore } from "./IEngineCore";
import type { IEngineCoreContext } from "./IEngineCoreContext";

/**
 * Method definition for the engine type initialiser.
 */
export type EngineTypeInitialiser<T extends IEngineCoreTypeBaseConfig = IEngineCoreTypeBaseConfig> =
	(
		engineCore: IEngineCore,
		context: IEngineCoreContext,
		instanceConfig: T
	) => Promise<EngineTypeInitialiserReturn>;

/**
 * Engine type initialiser return type.
 */
export interface EngineTypeInitialiserReturn {
	/**
	 * The instance type created.
	 */
	instanceType?: string;

	/**
	 * The factory to store the instance in.
	 */
	factory?: Factory<unknown>;

	/**
	 * The component created.
	 */
	component?: IComponent;
}
