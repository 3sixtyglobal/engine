// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { type IPolicyRequester, PolicyRequesterFactory } from "@twin.org/rights-management-models";
import { ExamplePolicyRequester } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyRequesterComponentConfig } from "../models/config/rightsManagementPolicyRequesterComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyRequesterComponentType } from "../models/types/rightsManagementPolicyRequesterComponentType.js";

/**
 * Initialise the rights management policy requester component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPolicyRequesterComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyRequesterComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof PolicyRequesterFactory;
	component?: IComponent;
}> {
	let component: IPolicyRequester | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPolicyRequesterComponentType.Example) {
		component = new ExamplePolicyRequester({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(ExamplePolicyRequester);
	}

	return {
		component,
		instanceType,
		factory: PolicyRequesterFactory
	};
}
