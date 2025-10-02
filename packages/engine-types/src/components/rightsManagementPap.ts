// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyAdministrationPointComponent } from "@twin.org/rights-management-models";
import {
	initSchema as initSchemaRightsManagementPap,
	type OdrlPolicy,
	PolicyAdministrationPointService
} from "@twin.org/rights-management-pap-service";
import { PolicyAdministrationPointClient } from "@twin.org/rights-management-rest-client";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { RightsManagementPapComponentConfig } from "../models/config/rightsManagementPapComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPapComponentType } from "../models/types/rightsManagementPapComponentType";

/**
 * Initialise the rights management PAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPapComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyAdministrationPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPapComponentType.Service) {
		initSchemaRightsManagementPap();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.odrlPolicyEntityStorageType,
			nameof<OdrlPolicy>()
		);

		component = new PolicyAdministrationPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PolicyAdministrationPointService);
	} else if (instanceConfig.type === RightsManagementPapComponentType.RestClient) {
		component = new PolicyAdministrationPointClient(instanceConfig.options);
		instanceType = nameofKebabCase(PolicyAdministrationPointClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
