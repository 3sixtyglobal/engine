// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, Is, StringHelper } from "@twin.org/core";
import { EngineModuleHelper } from "@twin.org/engine-core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type {
	IPolicyNegotiationPointComponent,
	IPolicyNegotiator,
	IPolicyRequester
} from "@twin.org/rights-management-models";
import { PolicyNegotiationPointService } from "@twin.org/rights-management-pnp-service";
import { PolicyNegotiationPointClient } from "@twin.org/rights-management-rest-client";
import type { RightsManagementPnpComponentConfig } from "../models/config/rightsManagementPnpComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { RightsManagementPnpComponentType } from "../models/types/rightsManagementPnpComponentType";

/**
 * Initialise the rights management PNP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseRightsManagementPnpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPnpComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Rights Management PNP Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IPolicyNegotiationPointComponent;
	let instanceType: string;

	if (type === RightsManagementPnpComponentType.Service) {
		const negotiatorModules: { negotiatorId: string; negotiator: IPolicyNegotiator }[] = [];
		if (Is.arrayValue(instanceConfig.options?.negotiatorModulesConfig)) {
			for (const moduleConfig of instanceConfig.options.negotiatorModulesConfig) {
				negotiatorModules.push({
					negotiatorId: moduleConfig.id,
					negotiator: await EngineModuleHelper.loadComponent(engineCore, moduleConfig)
				});
			}
		}

		const requesterModules: { requesterId: string; requester: IPolicyRequester }[] = [];
		if (Is.arrayValue(instanceConfig.options?.requesterModulesConfig)) {
			for (const moduleConfig of instanceConfig.options.requesterModulesConfig) {
				requesterModules.push({
					requesterId: moduleConfig.id,
					requester: await EngineModuleHelper.loadComponent(engineCore, moduleConfig)
				});
			}
		}

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
			...instanceConfig.options,
			config: {
				...instanceConfig.options?.config,
				negotiators: instanceConfig.options?.config?.negotiators ?? negotiatorModules,
				requesters: instanceConfig.options?.config?.requesters ?? requesterModules
			}
		});
		instanceType = StringHelper.kebabCase(nameof(PolicyNegotiationPointService));
	} else if (type === RightsManagementPnpComponentType.RestClient) {
		component = new PolicyNegotiationPointClient({
			...instanceConfig.options,
			authenticationGeneratorType:
				instanceConfig.options?.authenticationGeneratorType ??
				engineCore.getRegisteredInstanceType("authenticationGeneratorComponent", [
					"verifiable-credential"
				])
		});
		instanceType = StringHelper.kebabCase(nameof(PolicyNegotiationPointClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "RightsManagementPnpComponent"
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
