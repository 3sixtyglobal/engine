// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { Factory, IComponent } from "@3sixty/core";
import type { IEngineCoreTypeBaseConfig } from "./config/IEngineCoreTypeBaseConfig.js";

/**
 * Engine type initialiser return type.
 */
export interface IEngineTypeInitialiserReturn<
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
