// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@twin.org/core";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { PolicyEnforcementPointService } from "@twin.org/rights-management-pep-service";
import type { RightsManagementPepComponentConfig } from "../models/config/rightsManagementPepComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPepComponentType } from "../models/types/rightsManagementPepComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management PEP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPepComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPepComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPepComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PolicyEnforcementPointService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
						policyDecisionPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPdpComponent"
						),
						policyAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPapComponent"
						),
						policyManagementPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPmpComponent"
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PolicyEnforcementPointService);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
