// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, Is, StringHelper } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPdpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPdpComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PDP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyDecisionPointComponent;
	let instanceType: string;

	if (type === RightsManagementPdpComponentType.Service) {
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
		instanceType = StringHelper.kebabCase(nameof(PolicyDecisionPointService));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPdpComponent"
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
