// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { MetricsCollectorService } from "@3sixty/telemetry-service";
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
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(MetricsCollectorService)
						),
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent"),
						telemetryComponentType: engineCore.getRegisteredInstanceType("telemetryComponent")
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
