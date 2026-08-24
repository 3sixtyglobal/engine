// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageTracingConnector,
	initSchema,
	type Span
} from "@twin.org/tracing-connector-entity-storage";
import { OpenTelemetryTracingConnector } from "@twin.org/tracing-connector-opentelemetry";
import {
	MultiTracingConnector,
	SilentTracingConnector,
	TracingConnectorFactory
} from "@twin.org/tracing-models";
import { TracingRestClient } from "@twin.org/tracing-rest-client";
import { TracingService } from "@twin.org/tracing-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { TracingComponentConfig } from "../models/config/tracingComponentConfig.js";
import type { TracingConnectorConfig } from "../models/config/tracingConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TracingComponentType } from "../models/types/tracingComponentType.js";
import { TracingConnectorType } from "../models/types/tracingConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a tracing connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTracingConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TracingConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof TracingConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TracingConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.spanStorageConnectorType,
				nameof<Span>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageTracingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageTracingConnector.NAMESPACE;
	} else if (instanceConfig.type === TracingConnectorType.OpenTelemetry) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new OpenTelemetryTracingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = OpenTelemetryTracingConnector.NAMESPACE;
	} else if (instanceConfig.type === TracingConnectorType.Multi) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MultiTracingConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = MultiTracingConnector.NAMESPACE;
	} else if (instanceConfig.type === TracingConnectorType.Silent) {
		createComponent = (createConfig: typeof instanceConfig) => new SilentTracingConnector();
		instanceTypeName = SilentTracingConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: TracingConnectorFactory
	};
}

/**
 * Initialise the tracing component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTracingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TracingComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TracingComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TracingService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						tracingConnectorType: engineCore.getRegisteredInstanceType("tracingConnector")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TracingService);
	} else if (instanceConfig.type === TracingComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new TracingRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(TracingRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
