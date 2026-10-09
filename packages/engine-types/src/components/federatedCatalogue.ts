// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import { ComponentFactory } from "@3sixty/core";
import type { IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { FederatedCatalogueRestClient } from "@3sixty/federated-catalogue-rest-client";
import {
	type Dataset,
	FederatedCatalogueService,
	initSchema as initSchemaFederatedCatalogue
} from "@3sixty/federated-catalogue-service";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { FederatedCatalogueComponentConfig } from "../models/config/federatedCatalogueComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { FederatedCatalogueComponentType } from "../models/types/federatedCatalogueComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the federated catalogue component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseFederatedCatalogueComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FederatedCatalogueComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === FederatedCatalogueComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaFederatedCatalogue();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.datasetEntityStorageType,
				nameof<Dataset>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
			);
			return new FederatedCatalogueService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(FederatedCatalogueService)
						),
						trustComponentType: engineCore.getRegisteredInstanceType("trustComponent"),
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(FederatedCatalogueService)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(FederatedCatalogueService);
	} else if (instanceConfig.type === FederatedCatalogueComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new FederatedCatalogueRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(FederatedCatalogueRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,

		factory: ComponentFactory
	};
}
