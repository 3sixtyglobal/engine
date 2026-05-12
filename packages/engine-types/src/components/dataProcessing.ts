// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import {
	JsonConverterConnector,
	XmlConverterConnector
} from "@twin.org/data-processing-converters";
import { JsonPathExtractorConnector } from "@twin.org/data-processing-extractors";
import {
	DataConverterConnectorFactory,
	DataExtractorConnectorFactory
} from "@twin.org/data-processing-models";
import { DataProcessingRestClient } from "@twin.org/data-processing-rest-client";
import {
	DataProcessingService,
	initSchema as initSchemaDataProcessing,
	type ExtractionRuleGroup
} from "@twin.org/data-processing-service";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DataConverterConnectorConfig } from "../models/config/dataConverterConnectorConfig.js";
import type { DataExtractorConnectorConfig } from "../models/config/dataExtractorConnectorConfig.js";
import type { DataProcessingComponentConfig } from "../models/config/dataProcessingComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DataConverterConnectorType } from "../models/types/dataConverterConnectorType.js";
import { DataExtractorConnectorType } from "../models/types/dataExtractorConnectorType.js";
import { DataProcessingComponentType } from "../models/types/dataProcessingComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the data converter connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseDataConverterConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataConverterConnectorConfig
): EngineTypeInitialiserReturn<DataConverterConnectorConfig, typeof DataConverterConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === DataConverterConnectorType.Json) {
		createComponent = (createConfig: typeof instanceConfig) => new JsonConverterConnector();
		instanceTypeName = JsonConverterConnector.NAMESPACE;
	} else if (instanceConfig.type === DataConverterConnectorType.Xml) {
		createComponent = (createConfig: typeof instanceConfig) => new XmlConverterConnector();
		instanceTypeName = XmlConverterConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: DataConverterConnectorFactory
	};
}

/**
 * Initialise the data extractor connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseDataExtractorConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataExtractorConnectorConfig
): EngineTypeInitialiserReturn<DataExtractorConnectorConfig, typeof DataExtractorConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === DataExtractorConnectorType.JsonPath) {
		createComponent = (createConfig: typeof instanceConfig) => new JsonPathExtractorConnector();
		instanceTypeName = JsonPathExtractorConnector.NAMESPACE;
	}

	return {
		createComponent,
		instanceTypeName,
		factory: DataExtractorConnectorFactory
	};
}

/**
 * Initialise the data processing component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseDataProcessingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataProcessingComponentConfig
): EngineTypeInitialiserReturn<DataProcessingComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === DataProcessingComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaDataProcessing();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.extractionRuleGroupStorageConnectorType,
				nameof<ExtractionRuleGroup>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new DataProcessingService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = nameofKebabCase(DataProcessingService);
	} else if (instanceConfig.type === DataProcessingComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DataProcessingRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(DataProcessingRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
