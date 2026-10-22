// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameofKebabCase } from "@3sixty/nameof";
import { MetricsProducerFactory } from "@3sixty/telemetry-models";
import { ProcessMetricsProducer, SystemMetricsProducer } from "@3sixty/telemetry-producers";
import type { MetricsProducerComponentConfig } from "../models/config/metricsProducerComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { MetricsProducerComponentType } from "../models/types/metricsProducerComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a metrics producer.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseMetricsProducerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: MetricsProducerComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof MetricsProducerFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MetricsProducerComponentType.System) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new SystemMetricsProducer(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						telemetryComponentType: engineCore.getRegisteredInstanceType("telemetryComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(SystemMetricsProducer);
	} else if (instanceConfig.type === MetricsProducerComponentType.Process) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new ProcessMetricsProducer(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						telemetryComponentType: engineCore.getRegisteredInstanceType("telemetryComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(ProcessMetricsProducer);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: MetricsProducerFactory
	};
}
