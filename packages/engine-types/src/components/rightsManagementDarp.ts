// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { DataAccessRequestPointService } from "@twin.org/rights-management-dap-service";
import type { IDataAccessRequestPointComponent } from "@twin.org/rights-management-models";
import type { RightsManagementDarpComponentConfig } from "../models/config/rightsManagementDarpComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementDarpComponentType } from "../models/types/rightsManagementDarpComponentType.js";

/**
 * Initialise the rights management DARP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementDarpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementDarpComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IDataAccessRequestPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementDarpComponentType.Service) {
		component = new DataAccessRequestPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(DataAccessRequestPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
