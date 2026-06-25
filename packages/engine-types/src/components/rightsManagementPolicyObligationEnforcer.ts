// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { PolicyObligationEnforcerFactory } from "@twin.org/rights-management-models";
import { PassThroughPolicyObligationEnforcer } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyObligationEnforcerComponentConfig } from "../models/config/rightsManagementPolicyObligationEnforcerComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyObligationEnforcerComponentType } from "../models/types/rightsManagementPolicyObligationEnforcerComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management policy obligation enforcer component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPolicyObligationEnforcerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyObligationEnforcerComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof PolicyObligationEnforcerFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPolicyObligationEnforcerComponentType.PassThrough) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PassThroughPolicyObligationEnforcer(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(
							nameof(PassThroughPolicyObligationEnforcer)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PassThroughPolicyObligationEnforcer);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: PolicyObligationEnforcerFactory
	};
}
