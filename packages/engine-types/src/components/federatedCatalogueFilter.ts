// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { FilterByMetadata } from "@3sixty/federated-catalogue-filters";
import { FederatedCatalogueFilterFactory } from "@3sixty/federated-catalogue-models";
import {
	type Dataset,
	initSchema as initSchemaFederatedCatalogue
} from "@3sixty/federated-catalogue-service";
import { nameof } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { FederatedCatalogueFilterComponentConfig } from "../models/config/federatedCatalogueFilterComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { FederatedCatalogueFilterComponentType } from "../models/types/federatedCatalogueFilterComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the federated catalogue filter component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseFederatedCatalogueFilterComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FederatedCatalogueFilterComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof FederatedCatalogueFilterFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === FederatedCatalogueFilterComponentType.FilterByMetadata) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaFederatedCatalogue();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.datasetStorageConnectorType,
				nameof<Dataset>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
			);
			return new FilterByMetadata(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = nameof(FilterByMetadata);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: FederatedCatalogueFilterFactory
	};
}
