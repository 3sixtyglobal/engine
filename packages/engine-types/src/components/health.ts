// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { HealthRestClient } from "@twin.org/api-rest-client";
import { HealthService } from "@twin.org/api-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { HealthComponentConfig } from "../models/config/healthComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { HealthComponentType } from "../models/types/healthComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the health component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseHealthComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: HealthComponentConfig
): EngineTypeInitialiserReturn<HealthComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === HealthComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new HealthService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(HealthService);
	} else if (instanceConfig.type === HealthComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new HealthRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(HealthRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
