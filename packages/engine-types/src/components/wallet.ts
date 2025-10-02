// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageWalletConnector,
	initSchema as initSchemaWallet,
	type WalletAddress
} from "@twin.org/wallet-connector-entity-storage";
import { IotaWalletConnector } from "@twin.org/wallet-connector-iota";
import { WalletConnectorFactory, type IWalletConnector } from "@twin.org/wallet-models";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { DltConfig } from "../models/config/dltConfig";
import type { WalletConnectorConfig } from "../models/config/walletConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DltConfigType } from "../models/types/dltConfigType";
import { WalletConnectorType } from "../models/types/walletConnectorType";
import { EngineTypeHelper } from "../utils/engineTypeHelper";

/**
 * Initialise a wallet connector.
 * @param engineCore The engine core.
 * @param context The context for the node.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseWalletConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: WalletConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof WalletConnectorFactory;
	component?: IComponent;
}> {
	let component: IWalletConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === WalletConnectorType.Iota) {
		const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
			engineCore.getConfig(),
			"dltConfig",
			DltConfigType.Iota
		);
		component = new IotaWalletConnector({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			faucetConnectorType: engineCore.getRegisteredInstanceType("faucetConnector"),
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaWalletConnector.NAMESPACE;
	} else if (instanceConfig.type === WalletConnectorType.EntityStorage) {
		initSchemaWallet();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.walletAddressEntityStorageType,
			nameof<WalletAddress>()
		);

		component = new EntityStorageWalletConnector({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			faucetConnectorType: engineCore.getRegisteredInstanceType("faucetConnector"),
			...instanceConfig.options
		});
		instanceType = EntityStorageWalletConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: WalletConnectorFactory
	};
}
