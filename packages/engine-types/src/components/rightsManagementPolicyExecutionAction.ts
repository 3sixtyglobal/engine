// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import {
	type IPolicyExecutionAction,
	PolicyExecutionActionFactory
} from "@twin.org/rights-management-models";
import { LoggingPolicyExecutionAction } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyExecutionActionComponentConfig } from "../models/config/rightsManagementPolicyExecutionActionComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyExecutionActionComponentType } from "../models/types/rightsManagementPolicyExecutionActionComponentType.js";

/**
 * Initialise the rights management policy execution action component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPolicyExecutionActionComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyExecutionActionComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof PolicyExecutionActionFactory;
	component?: IComponent;
}> {
	let component: IPolicyExecutionAction | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPolicyExecutionActionComponentType.Logging) {
		component = new LoggingPolicyExecutionAction({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(LoggingPolicyExecutionAction);
	}

	return {
		component,
		instanceType,
		factory: PolicyExecutionActionFactory
	};
}
