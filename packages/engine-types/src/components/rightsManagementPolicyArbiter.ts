// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { PolicyArbiterFactory } from "@3sixty/rights-management-models";
import { DefaultPolicyArbiter, PassThroughPolicyArbiter } from "@3sixty/rights-management-plugins";
import type { RightsManagementPolicyArbiterComponentConfig } from "../models/config/rightsManagementPolicyArbiterComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyArbiterComponentType } from "../models/types/rightsManagementPolicyArbiterComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management policy arbiter component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPolicyArbiterComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyArbiterComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof PolicyArbiterFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPolicyArbiterComponentType.PassThrough) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PassThroughPolicyArbiter(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(PassThroughPolicyArbiter)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(PassThroughPolicyArbiter);
	} else if (instanceConfig.type === RightsManagementPolicyArbiterComponentType.Default) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DefaultPolicyArbiter(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(DefaultPolicyArbiter)
						),
						policyAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPapComponent"
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(DefaultPolicyArbiter);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: PolicyArbiterFactory
	};
}
