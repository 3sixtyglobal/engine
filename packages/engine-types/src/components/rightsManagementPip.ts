// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { IPolicyInformationPointComponent } from "@twin.org/rights-management-models";
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
export function initialiseRightsManagementPipComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPipComponentConfig,
	overrideInstanceType?: string
): string | undefined {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PIP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyInformationPointComponent;
	let instanceType: string;

	if (type === RightsManagementPipComponentType.Service) {
		component = new PolicyInformationPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
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
