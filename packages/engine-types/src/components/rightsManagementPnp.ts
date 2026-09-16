// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { PolicyNegotiationPointService } from "@twin.org/rights-management-pnp-service";
import { PolicyNegotiationPointRestClient } from "@twin.org/rights-management-rest-client";
import { initialisePnapStorage } from "./rightsManagementPnap.js";
import type { RightsManagementPnpComponentConfig } from "../models/config/rightsManagementPnpComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPnpComponentType } from "../models/types/rightsManagementPnpComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management PNP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPnpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPnpComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPnpComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialisePnapStorage(
				engineCore,
				context,
				createConfig.options?.policyNegotiationEntityStorageType
			);

			return new PolicyNegotiationPointService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(PolicyNegotiationPointService)
						),
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
						policyNegotiationPointRemoteComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPnpComponent",
							["remote"]
						),
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(PolicyNegotiationPointService);
	} else if (instanceConfig.type === RightsManagementPnpComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PolicyNegotiationPointRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(PolicyNegotiationPointRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
