// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, Is, type IComponent } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type {
	IPolicyEnforcementPointComponent,
	IPolicyEnforcementProcessor
} from "@twin.org/rights-management-models";
import { PolicyEnforcementPointService } from "@twin.org/rights-management-pep-service";
import type { RightsManagementPepComponentConfig } from "../models/config/rightsManagementPepComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPepComponentType } from "../models/types/rightsManagementPepComponentType";

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
		const processorModules: { processorId: string; processor: IPolicyEnforcementProcessor }[] = [];
		if (Is.arrayValue(instanceConfig.options?.processorModulesConfig)) {
			for (const moduleConfig of instanceConfig.options.processorModulesConfig) {
				processorModules.push({
					processorId: moduleConfig.id,
					processor: await EngineModuleHelper.loadComponent(engineCore, moduleConfig)
				});
			}
		}

		component = new PolicyEnforcementPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyDecisionPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPdpComponent"
			),
			...instanceConfig.options,
			config: {
				...instanceConfig.options?.config,
				processors: instanceConfig.options?.config?.processors ?? processorModules
			}
		});
		instanceType = nameofKebabCase(PolicyEnforcementPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
