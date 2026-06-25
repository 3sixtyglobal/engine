// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { MetricsCollectorService } from "@twin.org/telemetry-service";
import type { MetricsCollectorComponentConfig } from "../models/config/metricsCollectorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { MetricsCollectorComponentType } from "../models/types/metricsCollectorComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the metrics collector orchestrator component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseMetricsCollectorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MetricsCollectorComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MetricsCollectorComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MetricsCollectorService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(MetricsCollectorService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
