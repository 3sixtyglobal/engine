// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, Is } from "@twin.org/core";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPxpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPxpComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PXP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyExecutionPointComponent;
	let instanceType: string;

	if (type === RightsManagementPxpComponentType.Service) {
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
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPxpComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
