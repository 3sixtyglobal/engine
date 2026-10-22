// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof } from "@3sixty/nameof";
import {
	EntityStorageWalletConnector,
	initSchema as initSchemaWallet,
	type WalletAddress
} from "@3sixty/wallet-connector-entity-storage";
import { IotaWalletConnector } from "@3sixty/wallet-connector-iota";
import { WalletConnectorFactory } from "@3sixty/wallet-models";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { WalletConnectorConfig } from "../models/config/walletConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { WalletConnectorType } from "../models/types/walletConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a wallet connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseWalletConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: WalletConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof WalletConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === WalletConnectorType.Iota) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
				engineCore.getConfig(),
				"dltConfig",
				DltConfigType.Iota
			);
			return new IotaWalletConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						faucetConnectorType: engineCore.getRegisteredInstanceTypeOptional("faucetConnector"),
						config: dltConfig?.options?.config
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = IotaWalletConnector.NAMESPACE;
	} else if (instanceConfig.type === WalletConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaWallet();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.walletAddressEntityStorageType,
				nameof<WalletAddress>(),
				[]
			);
			return new EntityStorageWalletConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						faucetConnectorType: engineCore.getRegisteredInstanceTypeOptional("faucetConnector")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageWalletConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: WalletConnectorFactory
	};
}
