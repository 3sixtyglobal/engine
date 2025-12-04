// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyEnforcementPointComponent } from "@twin.org/rights-management-models";
import { PolicyEnforcementPointService } from "@twin.org/rights-management-pep-service";
import type { RightsManagementPepComponentConfig } from "../models/config/rightsManagementPepComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPepComponentType } from "../models/types/rightsManagementPepComponentType.js";

/**
 * Initialise the rights management PEP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPepComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPepComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyEnforcementPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPepComponentType.Service) {
		component = new PolicyEnforcementPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyDecisionPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPdpComponent"
			),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PolicyEnforcementPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
