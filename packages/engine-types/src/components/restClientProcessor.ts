// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { RestClientProcessorFactory } from "@twin.org/api-models";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { TracingRestClientProcessor } from "@twin.org/tracing-processors";
import type { RestClientProcessorConfig } from "../models/config/restClientProcessorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RestClientProcessorType } from "../models/types/restClientProcessorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the REST client processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRestClientProcessorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RestClientProcessorConfig
): EngineTypeInitialiserReturn<RestClientProcessorConfig, typeof RestClientProcessorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RestClientProcessorType.Tracing) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TracingRestClientProcessor(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						tracingComponentType: engineCore.getRegisteredInstanceTypeOptional("tracingComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TracingRestClientProcessor);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: RestClientProcessorFactory
	};
}
