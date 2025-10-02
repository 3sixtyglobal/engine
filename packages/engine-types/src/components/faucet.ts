// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageFaucetConnector,
	initSchema as initSchemaWallet,
	type WalletAddress
} from "@twin.org/wallet-connector-entity-storage";
import { IotaFaucetConnector } from "@twin.org/wallet-connector-iota";
import { FaucetConnectorFactory, type IFaucetConnector } from "@twin.org/wallet-models";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { DltConfig } from "../models/config/dltConfig";
import type { FaucetConnectorConfig } from "../models/config/faucetConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DltConfigType } from "../models/types/dltConfigType";
import { FaucetConnectorType } from "../models/types/faucetConnectorType";
import { EngineTypeHelper } from "../utils/engineTypeHelper";

/**
 * Initialise a faucet connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseFaucetConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: FaucetConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof FaucetConnectorFactory;
	component?: IComponent;
}> {
	let component: IFaucetConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === FaucetConnectorType.Iota) {
		const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
			engineCore.getConfig(),
			"dltConfig",
			DltConfigType.Iota
		);
		component = new IotaFaucetConnector({
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaFaucetConnector.NAMESPACE;
	} else if (instanceConfig.type === FaucetConnectorType.EntityStorage) {
		initSchemaWallet();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.walletAddressEntityStorageType,
			nameof<WalletAddress>()
		);

		component = new EntityStorageFaucetConnector(instanceConfig.options);
		instanceType = EntityStorageFaucetConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: FaucetConnectorFactory
	};
}
