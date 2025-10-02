// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyManagementPointComponent } from "@twin.org/rights-management-models";
import { PolicyManagementPointService } from "@twin.org/rights-management-pmp-service";
import type { RightsManagementPmpComponentConfig } from "../models/config/rightsManagementPmpComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPmpComponentType } from "../models/types/rightsManagementPmpComponentType";

/**
 * Initialise the rights management PMP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPmpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPmpComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyManagementPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPmpComponentType.Service) {
		component = new PolicyManagementPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPapComponent"
			),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PolicyManagementPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
