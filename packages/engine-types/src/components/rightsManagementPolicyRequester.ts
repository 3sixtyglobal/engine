// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { PolicyRequesterFactory } from "@twin.org/rights-management-models";
import { PassThroughPolicyRequester } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyRequesterComponentConfig } from "../models/config/rightsManagementPolicyRequesterComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyRequesterComponentType } from "../models/types/rightsManagementPolicyRequesterComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management policy requester component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPolicyRequesterComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyRequesterComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof PolicyRequesterFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPolicyRequesterComponentType.PassThrough) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PassThroughPolicyRequester(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent") },
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PassThroughPolicyRequester);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: PolicyRequesterFactory
	};
}
