// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { InformationRestClient } from "@twin.org/api-rest-client";
import { InformationService } from "@twin.org/api-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { EngineTypeHelper } from "@twin.org/engine-types";
import { nameofKebabCase } from "@twin.org/nameof";
import type { InformationComponentConfig } from "../models/config/informationComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { InformationComponentType } from "../models/types/informationComponentType.js";

/**
 * Initialise the information component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseInformationComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: InformationComponentConfig
): EngineTypeInitialiserReturn<InformationComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === InformationComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new InformationService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(InformationService);
	} else if (instanceConfig.type === InformationComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new InformationRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(InformationRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
