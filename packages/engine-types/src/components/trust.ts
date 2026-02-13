// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { TrustService } from "@twin.org/trust-service";
import type { TrustComponentConfig } from "../models/config/trustComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TrustComponentType } from "../models/types/trustComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the trust component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTrustComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TrustComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TrustComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TrustService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent") },
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TrustService);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
