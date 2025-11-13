// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageNftConnector,
	initSchema,
	type Nft
} from "@twin.org/nft-connector-entity-storage";
import { IotaNftConnector } from "@twin.org/nft-connector-iota";
import { NftConnectorFactory, type INftComponent, type INftConnector } from "@twin.org/nft-models";
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
export async function initialiseNftConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: NftConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof NftConnectorFactory;
	component?: IComponent;
}> {
	let component: INftConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === NftConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.nftEntityStorageType,
			nameof<Nft>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		component = new EntityStorageNftConnector(instanceConfig.options);
		instanceType = EntityStorageNftConnector.NAMESPACE;
	} else if (instanceConfig.type === NftConnectorType.Iota) {
		const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
			engineCore.getConfig(),
			"dltConfig",
			DltConfigType.Iota
		);
		component = new IotaNftConnector({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			walletConnectorType: engineCore.getRegisteredInstanceType("walletConnector"),
			loggingComponentType: engineCore.getRegisteredInstanceTypeOptional("loggingComponent"),
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaNftConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
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
export async function initialiseNftComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: NftComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: INftComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === NftComponentType.Service) {
		component = new NftService(instanceConfig.options);
		instanceType = nameofKebabCase(NftService);
	} else if (instanceConfig.type === NftComponentType.RestClient) {
		component = new NftRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(NftRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
