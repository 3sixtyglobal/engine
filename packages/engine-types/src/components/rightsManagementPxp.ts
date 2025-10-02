// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, Is, type IComponent } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type {
	IPolicyExecutionAction,
	IPolicyExecutionPointComponent
} from "@twin.org/rights-management-models";
import { PolicyExecutionPointService } from "@twin.org/rights-management-pxp-service";
import type { RightsManagementPxpComponentConfig } from "../models/config/rightsManagementPxpComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPxpComponentType } from "../models/types/rightsManagementPxpComponentType";

/**
 * Initialise the rights management PXP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPxpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPxpComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyExecutionPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPxpComponentType.Service) {
		const modules: { actionId: string; action: IPolicyExecutionAction }[] = [];
		if (Is.arrayValue(instanceConfig.options?.actionModulesConfig)) {
			for (const moduleConfig of instanceConfig.options.actionModulesConfig) {
				modules.push({
					actionId: moduleConfig.id,
					action: await EngineModuleHelper.loadComponent(engineCore, moduleConfig)
				});
			}
		}

		component = new PolicyExecutionPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options,
			config: {
				...instanceConfig.options?.config,
				actions: instanceConfig.options?.config?.actions ?? modules
			}
		});
		instanceType = nameofKebabCase(PolicyExecutionPointService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
