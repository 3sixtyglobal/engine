// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { PolicyNegotiatorFactory } from "@twin.org/rights-management-models";
import { PassThroughPolicyNegotiator } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyNegotiatorComponentConfig } from "../models/config/rightsManagementPolicyNegotiatorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyNegotiatorComponentType } from "../models/types/rightsManagementPolicyNegotiatorComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management policy negotiator component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPolicyNegotiatorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyNegotiatorComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof PolicyNegotiatorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPolicyNegotiatorComponentType.PassThrough) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PassThroughPolicyNegotiator(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PassThroughPolicyNegotiator);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: PolicyNegotiatorFactory
	};
}
