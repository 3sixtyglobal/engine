// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { ITrustComponent } from "@twin.org/trust-models";
import { TrustService } from "@twin.org/trust-service";
import type { TrustComponentConfig } from "../models/config/trustComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TrustComponentType } from "../models/types/trustComponentType.js";

/**
 * Initialise the trust component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseTrustComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TrustComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: ITrustComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === TrustComponentType.Service) {
		component = new TrustService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(TrustService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
