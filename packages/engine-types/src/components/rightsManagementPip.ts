// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, Is, StringHelper } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPipComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPipComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PIP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyInformationPointComponent;
	let instanceType: string;

	if (type === RightsManagementPipComponentType.Service) {
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
		instanceType = StringHelper.kebabCase(nameof(PolicyInformationPointService));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPipComponent"
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
