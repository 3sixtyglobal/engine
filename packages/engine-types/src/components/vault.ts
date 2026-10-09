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
	EntityStorageVaultConnector,
	initSchema,
	type VaultKey,
	type VaultSecret
} from "@3sixty/vault-connector-entity-storage";
import { HashicorpVaultConnector } from "@3sixty/vault-connector-hashicorp";
import { VaultConnectorFactory } from "@3sixty/vault-models";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { VaultConnectorConfig } from "../models/config/vaultConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { VaultConnectorType } from "../models/types/vaultConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the vault connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseVaultConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VaultConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof VaultConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === VaultConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.vaultKeyEntityStorageType,
				nameof<VaultKey>(),
				[]
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.vaultSecretEntityStorageType,
				nameof<VaultSecret>(),
				[]
			);
			return new EntityStorageVaultConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageVaultConnector.NAMESPACE;
	} else if (instanceConfig.type === VaultConnectorType.Hashicorp) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new HashicorpVaultConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = HashicorpVaultConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: VaultConnectorFactory
	};
}
