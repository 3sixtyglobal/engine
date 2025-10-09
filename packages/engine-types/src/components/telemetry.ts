// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageTelemetryConnector,
	initSchema,
	type TelemetryMetric,
	type TelemetryMetricValue
} from "@twin.org/telemetry-connector-entity-storage";
import {
	TelemetryConnectorFactory,
	type ITelemetryComponent,
	type ITelemetryConnector
} from "@twin.org/telemetry-models";
import { TelemetryRestClient } from "@twin.org/telemetry-rest-client";
import { TelemetryService } from "@twin.org/telemetry-service";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { TelemetryComponentConfig } from "../models/config/telemetryComponentConfig";
import type { TelemetryConnectorConfig } from "../models/config/telemetryConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { TelemetryComponentType } from "../models/types/telemetryComponentType";
import { TelemetryConnectorType } from "../models/types/telemetryConnectorType";

/**
 * Initialise a telemetry connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseTelemetryConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TelemetryConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof TelemetryConnectorFactory;
	component?: IComponent;
}> {
	let component: ITelemetryConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === TelemetryConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.telemetryMetricStorageConnectorType,
			nameof<TelemetryMetric>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.telemetryMetricValueStorageConnectorType,
			nameof<TelemetryMetricValue>()
		);
		component = new EntityStorageTelemetryConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageTelemetryConnector.NAMESPACE;
	}

	return {
		instanceType,
		factory: TelemetryConnectorFactory,
		component
	};
}

/**
 * Initialise the telemetry component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseTelemetryComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TelemetryComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: ITelemetryComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === TelemetryComponentType.Service) {
		component = new TelemetryService({
			telemetryConnectorType: engineCore.getRegisteredInstanceType("telemetryConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(TelemetryService);
	} else if (instanceConfig.type === TelemetryComponentType.RestClient) {
		component = new TelemetryRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(TelemetryRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
