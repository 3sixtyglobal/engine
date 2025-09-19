// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, Is, I18n, StringHelper } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPepComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPepComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PEP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyEnforcementPointComponent;
	let instanceType: string;

	if (type === RightsManagementPepComponentType.Service) {
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
		instanceType = StringHelper.kebabCase(nameof(PolicyEnforcementPointService));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPepComponent"
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
