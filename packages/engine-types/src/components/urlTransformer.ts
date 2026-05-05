// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { UrlTransformerService } from "@twin.org/api-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { UrlTransformerComponentConfig } from "../models/config/urlTransformerComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { UrlTransformerComponentType } from "../models/types/urlTransformerComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the URL transformer component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseUrlTransformerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: UrlTransformerComponentConfig
): EngineTypeInitialiserReturn<UrlTransformerComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === UrlTransformerComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new UrlTransformerService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(UrlTransformerService);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
