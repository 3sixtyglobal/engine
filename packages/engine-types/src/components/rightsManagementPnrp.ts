// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { IPolicyNegotiationRequestPointComponent } from "@twin.org/rights-management-models";
import { PolicyNegotiationRequestPointService } from "@twin.org/rights-management-pnp-service";
import type { RightsManagementPnrpComponentConfig } from "../models/config/rightsManagementPnrpComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPnrpComponentType } from "../models/types/rightsManagementPnrpComponentType";

/**
 * Initialise the rights management PNRP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPnrpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPnrpComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PNRP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyNegotiationRequestPointComponent;
	let instanceType: string;

	if (type === RightsManagementPnrpComponentType.Service) {
		component = new PolicyNegotiationRequestPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			policyInformationPointComponentType: engineCore.getRegisteredInstanceType(
				"rightsManagementPipComponent"
			),
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(PolicyNegotiationRequestPointService));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPnrpComponent"
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
