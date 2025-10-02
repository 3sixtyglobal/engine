// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import {
	JsonConverterConnector,
	XmlConverterConnector
} from "@twin.org/data-processing-converters";
import { JsonPathExtractorConnector } from "@twin.org/data-processing-extractors";
import {
	DataConverterConnectorFactory,
	DataExtractorConnectorFactory,
	type IDataConverterConnector,
	type IDataExtractorConnector,
	type IDataProcessingComponent
} from "@twin.org/data-processing-models";
import { DataProcessingClient } from "@twin.org/data-processing-rest-client";
import {
	DataProcessingService,
	initSchema as initSchemaDataProcessing,
	type ExtractionRuleGroup
} from "@twin.org/data-processing-service";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { DataConverterConnectorConfig } from "../models/config/dataConverterConnectorConfig";
import type { DataExtractorConnectorConfig } from "../models/config/dataExtractorConnectorConfig";
import type { DataProcessingComponentConfig } from "../models/config/dataProcessingComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DataConverterConnectorType } from "../models/types/dataConverterConnectorType";
import { DataExtractorConnectorType } from "../models/types/dataExtractorConnectorType";
import { DataProcessingComponentType } from "../models/types/dataProcessingComponentType";

/**
 * Initialise the data converter connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseDataConverterConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataConverterConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof DataConverterConnectorFactory;
	component?: IComponent;
}> {
	let component: IDataConverterConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === DataConverterConnectorType.Json) {
		component = new JsonConverterConnector();
		instanceType = JsonConverterConnector.NAMESPACE;
	} else if (instanceConfig.type === DataConverterConnectorType.Xml) {
		component = new XmlConverterConnector();
		instanceType = XmlConverterConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
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
export async function initialiseDataExtractorConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataExtractorConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof DataExtractorConnectorFactory;
	component?: IComponent;
}> {
	let component: IDataExtractorConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === DataExtractorConnectorType.JsonPath) {
		component = new JsonPathExtractorConnector();
		instanceType = JsonPathExtractorConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
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
export async function initialiseDataProcessingComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataProcessingComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IDataProcessingComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === DataProcessingComponentType.Service) {
		initSchemaDataProcessing();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.extractionRuleGroupStorageConnectorType,
			nameof<ExtractionRuleGroup>()
		);

		component = new DataProcessingService({
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(DataProcessingService);
	} else if (instanceConfig.type === DataProcessingComponentType.RestClient) {
		component = new DataProcessingClient(instanceConfig.options);
		instanceType = nameofKebabCase(DataProcessingClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
