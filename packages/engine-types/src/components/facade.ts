// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { FacadeFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { TracingFacade } from "@3sixty/tracing-facades";
import type { FacadeConfig } from "../models/config/facadeConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { FacadeType } from "../models/types/facadeType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a facade.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseFacade(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FacadeConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof FacadeFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === FacadeType.Tracing) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TracingFacade(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						tracingComponentType: engineCore.getRegisteredInstanceTypeOptional("tracingComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(TracingFacade)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TracingFacade);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: FacadeFactory
	};
}
