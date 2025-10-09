// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { IFederatedCatalogueComponent } from "@twin.org/federated-catalogue-models";
import { FederatedCatalogueRestClient } from "@twin.org/federated-catalogue-rest-client";
import {
	type DataResourceEntry,
	type DataSpaceConnectorEntry,
	FederatedCatalogueService,
	initSchema as initSchemaFederatedCatalogue,
	type ParticipantEntry,
	type ServiceOfferingEntry
} from "@twin.org/federated-catalogue-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { FederatedCatalogueComponentConfig } from "../models/config/federatedCatalogueComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { FederatedCatalogueComponentType } from "../models/types/federatedCatalogueComponentType";

/**
 * Initialise the federated catalogue component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseFederatedCatalogueComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FederatedCatalogueComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IFederatedCatalogueComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === FederatedCatalogueComponentType.Service) {
		initSchemaFederatedCatalogue();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.dataResourceEntityStorageType,
			nameof<DataResourceEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.participantEntityStorageType,
			nameof<ParticipantEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.serviceOfferingEntityStorageType,
			nameof<ServiceOfferingEntry>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.dataSpaceConnectorStorageType,
			nameof<DataSpaceConnectorEntry>()
		);

		component = new FederatedCatalogueService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			identityResolverComponentType: engineCore.getRegisteredInstanceType(
				"identityResolverComponent"
			),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(FederatedCatalogueService);
	} else if (instanceConfig.type === FederatedCatalogueComponentType.RestClient) {
		component = new FederatedCatalogueRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(FederatedCatalogueRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
