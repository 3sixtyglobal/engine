// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { MetricsProducerFactory } from "@twin.org/telemetry-models";
import { ProcessMetricsProducer, SystemMetricsProducer } from "@twin.org/telemetry-producers";
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
