// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { PolicyExecutionActionFactory } from "@twin.org/rights-management-models";
import { LoggingPolicyExecutionAction } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyExecutionActionComponentConfig } from "../models/config/rightsManagementPolicyExecutionActionComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyExecutionActionComponentType } from "../models/types/rightsManagementPolicyExecutionActionComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management policy execution action component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPolicyExecutionActionComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyExecutionActionComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof PolicyExecutionActionFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPolicyExecutionActionComponentType.Logging) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new LoggingPolicyExecutionAction(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent") },
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(LoggingPolicyExecutionAction);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: PolicyExecutionActionFactory
	};
}
