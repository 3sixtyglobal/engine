// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageNftConnector,
	initSchema,
	type Nft
} from "@twin.org/nft-connector-entity-storage";
import { IotaNftConnector } from "@twin.org/nft-connector-iota";
import { NftConnectorFactory } from "@twin.org/nft-models";
import { NftRestClient } from "@twin.org/nft-rest-client";
import { NftService } from "@twin.org/nft-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { NftComponentConfig } from "../models/config/nftComponentConfig.js";
import type { NftConnectorConfig } from "../models/config/nftConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { NftComponentType } from "../models/types/nftComponentType.js";
import { NftConnectorType } from "../models/types/nftConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the NFT connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseNftConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: NftConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof NftConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === NftConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.nftEntityStorageType,
				nameof<Nft>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);

			return new EntityStorageNftConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageNftConnector.NAMESPACE;
	} else if (instanceConfig.type === NftConnectorType.Iota) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
				engineCore.getConfig(),
				"dltConfig",
				DltConfigType.Iota
			);
			return new IotaNftConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						loggingComponentType: engineCore.getRegisteredLoggerType(nameof(IotaNftConnector)),
						config: dltConfig?.options?.config
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = IotaNftConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: NftConnectorFactory
	};
}

/**
 * Initialise the NFT component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseNftComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: NftComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === NftComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new NftService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(NftService);
	} else if (instanceConfig.type === NftComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new NftRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(NftRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
