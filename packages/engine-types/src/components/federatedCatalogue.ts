// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { IFederatedCatalogueComponent } from "@twin.org/federated-catalogue-models";
import { FederatedCatalogueRestClient } from "@twin.org/federated-catalogue-rest-client";
import {
	type Dataset,
	FederatedCatalogueService,
	initSchema as initSchemaFederatedCatalogue
} from "@twin.org/federated-catalogue-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { FederatedCatalogueComponentConfig } from "../models/config/federatedCatalogueComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { FederatedCatalogueComponentType } from "../models/types/federatedCatalogueComponentType.js";

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
			instanceConfig.options?.datasetStorageConnectorType,
			nameof<Dataset>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
		);

		component = new FederatedCatalogueService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
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
