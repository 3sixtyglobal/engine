// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { PolicyManagementPointService } from "@twin.org/rights-management-pmp-service";
import type { RightsManagementPmpComponentConfig } from "../models/config/rightsManagementPmpComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPmpComponentType } from "../models/types/rightsManagementPmpComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management PMP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPmpComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPmpComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPmpComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PolicyManagementPointService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(PolicyManagementPointService)
						),
						policyAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPapComponent"
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PolicyManagementPointService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
