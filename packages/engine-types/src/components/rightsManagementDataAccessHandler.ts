// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import {
	type IDataAccessHandler,
	DataAccessHandlerFactory
} from "@twin.org/rights-management-models";
import { ExampleDataAccessHandler } from "@twin.org/rights-management-plugins";
import type { RightsManagementDataAccessHandlerComponentConfig } from "../models/config/rightsManagementDataAccessHandlerComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementDataAccessHandlerComponentType } from "../models/types/rightsManagementDataAccessHandlerComponentType.js";

/**
 * Initialise the rights management data access handler component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementDataAccessHandlerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementDataAccessHandlerComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof DataAccessHandlerFactory;
	component?: IComponent;
}> {
	let component: IDataAccessHandler | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementDataAccessHandlerComponentType.Example) {
		component = new ExampleDataAccessHandler({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(ExampleDataAccessHandler);
	}

	return {
		component,
		instanceType,
		factory: DataAccessHandlerFactory
	};
}
