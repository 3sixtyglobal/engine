// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { FilterByExample } from "@twin.org/federated-catalogue-filters";
import {
	FederatedCatalogueFilterFactory,
	type IFederatedCatalogueFilter
} from "@twin.org/federated-catalogue-models";
import {
	type Dataset,
	initSchema as initSchemaFederatedCatalogue
} from "@twin.org/federated-catalogue-service";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { FederatedCatalogueFilterComponentConfig } from "../models/config/federatedCatalogueFilterComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { FederatedCatalogueFilterComponentType } from "../models/types/federatedCatalogueFilterComponentType.js";

/**
 * Initialise the federated catalogue filter component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseFederatedCatalogueFilterComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FederatedCatalogueFilterComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof FederatedCatalogueFilterFactory;
	component?: IComponent;
}> {
	let component: IFederatedCatalogueFilter | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === FederatedCatalogueFilterComponentType.FilterByExample) {
		initSchemaFederatedCatalogue();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.datasetStorageConnectorType,
			nameof<Dataset>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
		);

		component = new FilterByExample(instanceConfig.options);
		instanceType = nameof(FilterByExample);
	}

	return {
		component,
		instanceType,
		factory: FederatedCatalogueFilterFactory
	};
}
