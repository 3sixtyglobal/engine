// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, Is, type IComponent } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type {
	IPolicyInformationPointComponent,
	IPolicyInformationSource
} from "@twin.org/rights-management-models";
import { PolicyInformationPointService } from "@twin.org/rights-management-pip-service";
import type { RightsManagementPipComponentConfig } from "../models/config/rightsManagementPipComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPipComponentType } from "../models/types/rightsManagementPipComponentType";

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
		const informationSourceModules: { sourceId: string; source: IPolicyInformationSource }[] = [];
		if (Is.arrayValue(instanceConfig.options?.informationModulesConfig)) {
			for (const moduleConfig of instanceConfig.options.informationModulesConfig) {
				informationSourceModules.push({
					sourceId: moduleConfig.id,
					source: await EngineModuleHelper.loadComponent(engineCore, moduleConfig)
				});
			}
		}

		component = new PolicyInformationPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options,
			config: {
				...instanceConfig.options?.config,
				sources: instanceConfig.options?.config?.sources ?? informationSourceModules
			}
		});
		instanceType = nameofKebabCase(PolicyInformationPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
