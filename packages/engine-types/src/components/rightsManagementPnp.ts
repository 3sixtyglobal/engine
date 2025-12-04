// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyNegotiationPointComponent } from "@twin.org/rights-management-models";
import { PolicyNegotiationPointService } from "@twin.org/rights-management-pnp-service";
import { PolicyNegotiationPointRestClient } from "@twin.org/rights-management-rest-client";
import type { RightsManagementPnpComponentConfig } from "../models/config/rightsManagementPnpComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPnpComponentType } from "../models/types/rightsManagementPnpComponentType.js";

/**
 * Initialise the rights management PNP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPnpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPnpComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyNegotiationPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPnpComponentType.Service) {
		component = new PolicyNegotiationPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			policyNegotiationAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPnapComponent"
			),
			policyAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPapComponent"
			),
			policyInformationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPipComponent"
			),
			trustComponentType: engineCore.getRegisteredInstanceType("trustComponent"),
			...instanceConfig.options,
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(PolicyNegotiationPointService);
	} else if (instanceConfig.type === RightsManagementPnpComponentType.RestClient) {
		component = new PolicyNegotiationPointRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(PolicyNegotiationPointRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
