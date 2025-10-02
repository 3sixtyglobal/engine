// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import {
	EntityStorageVaultConnector,
	initSchema,
	type VaultKey,
	type VaultSecret
} from "@twin.org/vault-connector-entity-storage";
import { HashicorpVaultConnector } from "@twin.org/vault-connector-hashicorp";
import { VaultConnectorFactory, type IVaultConnector } from "@twin.org/vault-models";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { VaultConnectorConfig } from "../models/config/vaultConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { VaultConnectorType } from "../models/types/vaultConnectorType";

/**
 * Initialise the vault connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseVaultConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VaultConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof VaultConnectorFactory;
	component?: IComponent;
}> {
	let component: IVaultConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === VaultConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.vaultKeyEntityStorageType,
			nameof<VaultKey>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.vaultSecretEntityStorageType,
			nameof<VaultSecret>()
		);
		component = new EntityStorageVaultConnector(instanceConfig.options);
		instanceType = EntityStorageVaultConnector.NAMESPACE;
	} else if (instanceConfig.type === VaultConnectorType.Hashicorp) {
		component = new HashicorpVaultConnector(instanceConfig.options);
		instanceType = HashicorpVaultConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: VaultConnectorFactory
	};
}
