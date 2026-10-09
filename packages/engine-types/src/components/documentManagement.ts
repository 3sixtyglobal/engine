// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@3sixty/core";
import { DocumentManagementRestClient } from "@3sixty/document-management-rest-client";
import { DocumentManagementService } from "@3sixty/document-management-service";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import type { DocumentManagementComponentConfig } from "../models/config/documentManagementComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DocumentManagementComponentType } from "../models/types/documentManagementComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the document management component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseDocumentManagementComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DocumentManagementComponentConfig
): EngineTypeInitialiserReturn<DocumentManagementComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === DocumentManagementComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DocumentManagementService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						auditableItemGraphComponentType: engineCore.getRegisteredInstanceType(
							"auditableItemGraphComponent"
						),
						blobStorageComponentType: engineCore.getRegisteredInstanceType("blobStorageComponent"),
						attestationComponentType: engineCore.getRegisteredInstanceType("attestationComponent"),
						dataProcessingComponentType:
							engineCore.getRegisteredInstanceType("dataProcessingComponent"),
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(DocumentManagementService)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(DocumentManagementService);
	} else if (instanceConfig.type === DocumentManagementComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DocumentManagementRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(DocumentManagementRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
