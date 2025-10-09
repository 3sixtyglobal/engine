// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { DataAccessPointService } from "@twin.org/rights-management-dap-service";
import type { IDataAccessPointComponent } from "@twin.org/rights-management-models";
import { DataAccessPointRestClient } from "@twin.org/rights-management-rest-client";
import type { RightsManagementDapComponentConfig } from "../models/config/rightsManagementDapComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementDapComponentType } from "../models/types/rightsManagementDapComponentType";

/**
 * Initialise the rights management DAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementDapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementDapComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IDataAccessPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementDapComponentType.Service) {
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
		instanceType = nameofKebabCase(DataAccessPointService);
	} else if (instanceConfig.type === RightsManagementDapComponentType.RestClient) {
		component = new DataAccessPointRestClient({
			...instanceConfig.options,
			authenticationGeneratorType:
				instanceConfig.options?.authenticationGeneratorType ??
				engineCore.getRegisteredInstanceType("authenticationGeneratorComponent", [
					"verifiable-credential"
				])
		});
		instanceType = nameofKebabCase(DataAccessPointRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
