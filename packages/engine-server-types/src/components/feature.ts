// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { FeatureRestClient } from "@3sixty/api-auth-rest-client";
import { FeatureService } from "@3sixty/api-auth-service";
import { ComponentFactory, type IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper } from "@3sixty/engine-types";
import { nameofKebabCase } from "@3sixty/nameof";
import type { FeatureComponentConfig } from "../models/config/featureComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { FeatureComponentType } from "../models/types/featureComponentType.js";

/**
 * Initialise the feature component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseFeatureComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: FeatureComponentConfig
): EngineTypeInitialiserReturn<FeatureComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === FeatureComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new FeatureService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						authorizationComponentType:
							engineCore.getRegisteredInstanceType("authorizationComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(FeatureService);
	} else if (instanceConfig.type === FeatureComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new FeatureRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(FeatureRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
