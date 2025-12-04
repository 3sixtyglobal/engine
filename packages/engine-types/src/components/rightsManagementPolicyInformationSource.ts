// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import {
	type IPolicyInformationSource,
	PolicyInformationSourceFactory
} from "@twin.org/rights-management-models";
import {
	IdentityPolicyInformationSource,
	StaticPolicyInformationSource
} from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyInformationSourceComponentConfig } from "../models/config/rightsManagementPolicyInformationSourceComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyInformationSourceComponentType } from "../models/types/rightsManagementPolicyInformationSourceComponentType.js";

/**
 * Initialise the rights management policy information source component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPolicyInformationSourceComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyInformationSourceComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof PolicyInformationSourceFactory;
	component?: IComponent;
}> {
	let component: IPolicyInformationSource | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPolicyInformationSourceComponentType.Identity) {
		component = new IdentityPolicyInformationSource({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			identityResolverComponentType: engineCore.getRegisteredInstanceType(
				"identityResolverComponent"
			),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(IdentityPolicyInformationSource);
	} else if (instanceConfig.type === RightsManagementPolicyInformationSourceComponentType.Static) {
		component = new StaticPolicyInformationSource({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(StaticPolicyInformationSource);
	}

	return {
		component,
		instanceType,
		factory: PolicyInformationSourceFactory
	};
}
