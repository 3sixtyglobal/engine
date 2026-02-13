// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { SynchronisedStorageRestClient } from "@twin.org/synchronised-storage-rest-client";
import {
	type SyncSnapshotEntry,
	SynchronisedStorageService,
	initSchema as initSchemaSynchronisedStorage
} from "@twin.org/synchronised-storage-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { SynchronisedStorageComponentConfig } from "../models/config/synchronisedStorageComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { SynchronisedStorageComponentType } from "../models/types/synchronisedStorageComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the synchronised storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseSynchronisedStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: SynchronisedStorageComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === SynchronisedStorageComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaSynchronisedStorage();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.syncSnapshotStorageConnectorType,
				nameof<SyncSnapshotEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
			);
			return new SynchronisedStorageService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
						eventBusComponentType: engineCore.getRegisteredInstanceType("eventBusComponent"),
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						verifiableStorageConnectorType: engineCore.getRegisteredInstanceType(
							"verifiableStorageConnector"
						),
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						trustedSynchronisedStorageComponentType: engineCore.getRegisteredInstanceTypeOptional(
							"synchronisedStorageComponent",
							["trusted"]
						),
						blobStorageConnectorType: engineCore.getRegisteredInstanceType("blobStorageConnector", [
							"public"
						]),
						trustComponentType: engineCore.getRegisteredInstanceType("trustComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(SynchronisedStorageService);
	} else if (instanceConfig.type === SynchronisedStorageComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new SynchronisedStorageRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(SynchronisedStorageRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
