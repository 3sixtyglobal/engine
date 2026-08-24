// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { PolicyDecisionPointService } from "@twin.org/rights-management-pdp-service";
import type { RightsManagementPdpComponentConfig } from "../models/config/rightsManagementPdpComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPdpComponentType } from "../models/types/rightsManagementPdpComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management PDP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPdpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPdpComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPdpComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PolicyDecisionPointService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(PolicyDecisionPointService)
						),
						policyInformationPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPipComponent"
						),
						policyExecutionPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPxpComponent"
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PolicyDecisionPointService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
