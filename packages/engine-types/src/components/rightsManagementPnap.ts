// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n } from "@twin.org/core";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPnapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPnapComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PNAP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyNegotiationAdminPointComponent;
	let instanceType: string;

	if (type === RightsManagementPnapComponentType.Service) {
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
	} else if (type === RightsManagementPnapComponentType.RestClient) {
		component = new PolicyNegotiationAdminPointClient(instanceConfig.options);
		instanceType = nameofKebabCase(PolicyNegotiationAdminPointClient);
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPnapComponent"
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
