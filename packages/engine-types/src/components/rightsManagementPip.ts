// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyInformationPointComponent } from "@twin.org/rights-management-models";
import { PolicyInformationPointService } from "@twin.org/rights-management-pip-service";
import type { RightsManagementPipComponentConfig } from "../models/config/rightsManagementPipComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPipComponentType } from "../models/types/rightsManagementPipComponentType.js";

/**
 * Initialise the rights management PIP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPipComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPipComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyInformationPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPipComponentType.Service) {
		component = new PolicyInformationPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PolicyInformationPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
