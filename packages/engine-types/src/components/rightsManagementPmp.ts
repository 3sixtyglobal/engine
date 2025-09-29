// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyManagementPointComponent } from "@twin.org/rights-management-models";
import { PolicyManagementPointService } from "@twin.org/rights-management-pmp-service";
import type { RightsManagementPmpComponentConfig } from "../models/config/rightsManagementPmpComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPmpComponentType } from "../models/types/rightsManagementPmpComponentType";

/**
 * Initialise the rights management PMP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPmpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPmpComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PMP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyManagementPointComponent;
	let instanceType: string;

	if (type === RightsManagementPmpComponentType.Service) {
		component = new PolicyManagementPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPapComponent"
			),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PolicyManagementPointService);
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPmpComponent"
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
