// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { PolicyInformationPointService } from "@twin.org/rights-management-pip-service";
import type { RightsManagementPipComponentConfig } from "../models/config/rightsManagementPipComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPipComponentType } from "../models/types/rightsManagementPipComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management PIP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPipComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPipComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPipComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PolicyInformationPointService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent") },
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PolicyInformationPointService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
