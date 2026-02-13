// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageFaucetConnector,
	initSchema as initSchemaWallet,
	type WalletAddress
} from "@twin.org/wallet-connector-entity-storage";
import {
	type IIotaFaucetConnectorConfig,
	IotaFaucetConnector
} from "@twin.org/wallet-connector-iota";
import { FaucetConnectorFactory } from "@twin.org/wallet-models";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { FaucetConnectorConfig } from "../models/config/faucetConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { FaucetConnectorType } from "../models/types/faucetConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a faucet connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseFaucetConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FaucetConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof FaucetConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === FaucetConnectorType.Iota) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
				engineCore.getConfig(),
				"dltConfig",
				DltConfigType.Iota
			);
			return new IotaFaucetConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						config: dltConfig?.options?.config as IIotaFaucetConnectorConfig
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = IotaFaucetConnector.NAMESPACE;
	} else if (instanceConfig.type === FaucetConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaWallet();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.walletAddressEntityStorageType,
				nameof<WalletAddress>(),
				[]
			);
			return new EntityStorageFaucetConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageFaucetConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: FaucetConnectorFactory
	};
}
