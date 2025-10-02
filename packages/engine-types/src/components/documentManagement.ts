// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IDocumentManagementComponent } from "@twin.org/document-management-models";
import { DocumentManagementClient } from "@twin.org/document-management-rest-client";
import { DocumentManagementService } from "@twin.org/document-management-service";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { DocumentManagementComponentConfig } from "../models/config/documentManagementComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DocumentManagementComponentType } from "../models/types/documentManagementComponentType";

/**
 * Initialise the document management component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseDocumentManagementComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DocumentManagementComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IDocumentManagementComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === DocumentManagementComponentType.Service) {
		component = new DocumentManagementService({
			auditableItemGraphComponentType: engineCore.getRegisteredInstanceType(
				"auditableItemGraphComponent"
			),
			blobStorageComponentType: engineCore.getRegisteredInstanceType("blobStorageComponent"),
			attestationComponentType: engineCore.getRegisteredInstanceType("attestationComponent"),
			dataProcessingComponentType: engineCore.getRegisteredInstanceType("dataProcessingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(DocumentManagementService);
	} else if (instanceConfig.type === DocumentManagementComponentType.RestClient) {
		component = new DocumentManagementClient(instanceConfig.options);
		instanceType = nameofKebabCase(DocumentManagementClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
