// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { IPolicyEnforcementPointComponent } from "@twin.org/rights-management-models";
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
export function initialiseRightsManagementPepComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPepComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PEP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyEnforcementPointComponent;
	let instanceType: string;

	if (type === RightsManagementPepComponentType.Service) {
		component = new PolicyEnforcementPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyDecisionPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPdpComponent"
			),
			...instanceConfig.options
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
