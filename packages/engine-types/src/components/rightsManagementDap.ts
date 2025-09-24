// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { DataAccessPointService } from "@twin.org/rights-management-dap-service";
import type { IDataAccessPointComponent } from "@twin.org/rights-management-models";
import { DataAccessPointClient } from "@twin.org/rights-management-rest-client";
import type { RightsManagementDapComponentConfig } from "../models/config/rightsManagementDapComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementDapComponentType } from "../models/types/rightsManagementDapComponentType";

/**
 * Initialise the rights management DAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementDapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementDapComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management DAP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IDataAccessPointComponent;
	let instanceType: string;

	if (type === RightsManagementDapComponentType.Service) {
		component = new DataAccessPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyEnforcementPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPepComponent"
			),
			...instanceConfig.options,
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = StringHelper.kebabCase(nameof(DataAccessPointService));
	} else if (type === RightsManagementDapComponentType.RestClient) {
		component = new DataAccessPointClient({
			...instanceConfig.options,
			authenticationGeneratorType:
				instanceConfig.options?.authenticationGeneratorType ??
				engineCore.getRegisteredInstanceType("authenticationGeneratorComponent", [
					"verifiable-credential"
				])
		});
		instanceType = StringHelper.kebabCase(nameof(DataAccessPointClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementDapComponent"
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
