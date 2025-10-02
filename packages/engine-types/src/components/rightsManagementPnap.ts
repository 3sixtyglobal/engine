// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyNegotiationAdminPointComponent } from "@twin.org/rights-management-models";
import {
	type PolicyNegotiation,
	PolicyNegotiationAdminPointService,
	initSchema as initSchemaRightsManagementPnap
} from "@twin.org/rights-management-pnp-service";
import { PolicyNegotiationAdminPointClient } from "@twin.org/rights-management-rest-client";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { RightsManagementPnapComponentConfig } from "../models/config/rightsManagementPnapComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPnapComponentType } from "../models/types/rightsManagementPnapComponentType";

/**
 * Initialise the rights management PNAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPnapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPnapComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyNegotiationAdminPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPnapComponentType.Service) {
		initSchemaRightsManagementPnap();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.policyNegotiationEntityStorageType,
			nameof<PolicyNegotiation>()
		);

		component = new PolicyNegotiationAdminPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			taskSchedulerComponentType: engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
			policyInformationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPipComponent"
			),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PolicyNegotiationAdminPointService);
	} else if (instanceConfig.type === RightsManagementPnapComponentType.RestClient) {
		component = new PolicyNegotiationAdminPointClient(instanceConfig.options);
		instanceType = nameofKebabCase(PolicyNegotiationAdminPointClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
