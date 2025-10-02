// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, Is, type IComponent } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type {
	IPolicyArbiter,
	IPolicyDecisionPointComponent
} from "@twin.org/rights-management-models";
import { PolicyDecisionPointService } from "@twin.org/rights-management-pdp-service";
import type { RightsManagementPdpComponentConfig } from "../models/config/rightsManagementPdpComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPdpComponentType } from "../models/types/rightsManagementPdpComponentType";

/**
 * Initialise the rights management PDP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPdpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPdpComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyDecisionPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPdpComponentType.Service) {
		const arbiterModules: { arbiterId: string; arbiter: IPolicyArbiter }[] = [];
		if (Is.arrayValue(instanceConfig.options?.arbiterModulesConfig)) {
			for (const moduleConfig of instanceConfig.options.arbiterModulesConfig) {
				arbiterModules.push({
					arbiterId: moduleConfig.id,
					arbiter: await EngineModuleHelper.loadComponent(engineCore, moduleConfig)
				});
			}
		}

		component = new PolicyDecisionPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyInformationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPipComponent"
			),
			policyManagementPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPmpComponent"
			),
			policyExecutionPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPxpComponent"
			),
			...instanceConfig.options,
			config: {
				...instanceConfig.options?.config,
				arbiters: instanceConfig.options?.config?.arbiters ?? arbiterModules
			}
		});
		instanceType = nameofKebabCase(PolicyDecisionPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
