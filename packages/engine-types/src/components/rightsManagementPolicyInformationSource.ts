// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { PolicyInformationSourceFactory } from "@twin.org/rights-management-models";
import {
	IdentityPolicyInformationSource,
	IdentityProfilePolicyInformationSource,
	StaticPolicyInformationSource
} from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyInformationSourceComponentConfig } from "../models/config/rightsManagementPolicyInformationSourceComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyInformationSourceComponentType } from "../models/types/rightsManagementPolicyInformationSourceComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management policy information source component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPolicyInformationSourceComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyInformationSourceComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof PolicyInformationSourceFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPolicyInformationSourceComponentType.Identity) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IdentityPolicyInformationSource(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(IdentityPolicyInformationSource)
						),
						identityResolverComponentType: engineCore.getRegisteredInstanceType(
							"identityResolverComponent"
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(IdentityPolicyInformationSource);
	} else if (
		instanceConfig.type === RightsManagementPolicyInformationSourceComponentType.IdentityProfile
	) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IdentityProfilePolicyInformationSource(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(IdentityProfilePolicyInformationSource)
						),
						identityProfileComponentType: engineCore.getRegisteredInstanceType(
							"identityProfileComponent"
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(IdentityProfilePolicyInformationSource);
	} else if (instanceConfig.type === RightsManagementPolicyInformationSourceComponentType.Static) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new StaticPolicyInformationSource(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(StaticPolicyInformationSource)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(StaticPolicyInformationSource);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: PolicyInformationSourceFactory
	};
}
