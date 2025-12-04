// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import {
	type IPolicyEnforcementProcessor,
	PolicyEnforcementProcessorFactory
} from "@twin.org/rights-management-models";
import { ExamplePolicyEnforcementProcessor } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyEnforcementProcessorComponentConfig } from "../models/config/rightsManagementPolicyEnforcementProcessorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyEnforcementProcessorComponentType } from "../models/types/rightsManagementPolicyEnforcementProcessorComponentType.js";

/**
 * Initialise the rights management policy enforcement processor component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPolicyEnforcementProcessorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyEnforcementProcessorComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof PolicyEnforcementProcessorFactory;
	component?: IComponent;
}> {
	let component: IPolicyEnforcementProcessor | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPolicyEnforcementProcessorComponentType.Example) {
		component = new ExamplePolicyEnforcementProcessor({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(ExamplePolicyEnforcementProcessor);
	}

	return {
		component,
		instanceType,
		factory: PolicyEnforcementProcessorFactory
	};
}
