// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { type IPolicyArbiter, PolicyArbiterFactory } from "@twin.org/rights-management-models";
import { PassThroughPolicyArbiter } from "@twin.org/rights-management-plugins";
import type { RightsManagementPolicyArbiterComponentConfig } from "../models/config/rightsManagementPolicyArbiterComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPolicyArbiterComponentType } from "../models/types/rightsManagementPolicyArbiterComponentType.js";

/**
 * Initialise the rights management policy arbiter component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPolicyArbiterComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPolicyArbiterComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof PolicyArbiterFactory;
	component?: IComponent;
}> {
	let component: IPolicyArbiter | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPolicyArbiterComponentType.PassThrough) {
		component = new PassThroughPolicyArbiter({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PassThroughPolicyArbiter);
	}

	return {
		component,
		instanceType,
		factory: PolicyArbiterFactory
	};
}
