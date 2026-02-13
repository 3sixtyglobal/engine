// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { PolicyEnforcementProcessorFactory } from "@twin.org/rights-management-models";
import {
	DefaultPolicyEnforcementProcessor,
	PassThroughPolicyEnforcementProcessor
} from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyEnforcementProcessorComponentConfig } from "../models/config/rightsManagementPolicyEnforcementProcessorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyEnforcementProcessorComponentType } from "../models/types/rightsManagementPolicyEnforcementProcessorComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management policy enforcement processor component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPolicyEnforcementProcessorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyEnforcementProcessorComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof PolicyEnforcementProcessorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPolicyEnforcementProcessorComponentType.PassThrough) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PassThroughPolicyEnforcementProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PassThroughPolicyEnforcementProcessor);
	} else if (
		instanceConfig.type === RightsManagementPolicyEnforcementProcessorComponentType.Default
	) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DefaultPolicyEnforcementProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(DefaultPolicyEnforcementProcessor);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: PolicyEnforcementProcessorFactory
	};
}
