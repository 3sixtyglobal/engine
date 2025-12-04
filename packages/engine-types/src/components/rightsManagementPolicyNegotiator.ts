// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import {
	type IPolicyNegotiator,
	PolicyNegotiatorFactory
} from "@twin.org/rights-management-models";
import { ExamplePolicyNegotiator } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyNegotiatorComponentConfig } from "../models/config/rightsManagementPolicyNegotiatorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyNegotiatorComponentType } from "../models/types/rightsManagementPolicyNegotiatorComponentType.js";

/**
 * Initialise the rights management policy negotiator component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPolicyNegotiatorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyNegotiatorComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof PolicyNegotiatorFactory;
	component?: IComponent;
}> {
	let component: IPolicyNegotiator | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPolicyNegotiatorComponentType.Example) {
		component = new ExamplePolicyNegotiator({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(ExamplePolicyNegotiator);
	}

	return {
		component,
		instanceType,
		factory: PolicyNegotiatorFactory
	};
}
