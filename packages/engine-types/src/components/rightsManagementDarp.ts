// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { DataAccessRequestPointService } from "@twin.org/rights-management-dap-service";
import type { IDataAccessRequestPointComponent } from "@twin.org/rights-management-models";
import type { RightsManagementDarpComponentConfig } from "../models/config/rightsManagementDarpComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementDarpComponentType } from "../models/types/rightsManagementDarpComponentType";

/**
 * Initialise the rights management DARP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementDarpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementDarpComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management DARP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IDataAccessRequestPointComponent;
	let instanceType: string;

	if (type === RightsManagementDarpComponentType.Service) {
		component = new DataAccessRequestPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(DataAccessRequestPointService);
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementDarpComponent"
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
