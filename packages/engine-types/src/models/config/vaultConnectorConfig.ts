// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageVaultConnectorConstructorOptions } from "@3sixty/vault-connector-entity-storage";
import type { IHashicorpVaultConnectorConstructorOptions } from "@3sixty/vault-connector-hashicorp";
import type { VaultConnectorType } from "../types/vaultConnectorType.js";

/**
 * Vault connector config types.
 */
export type VaultConnectorConfig =
	| {
			type: typeof VaultConnectorType.EntityStorage;
			options?: IEntityStorageVaultConnectorConstructorOptions;
	  }
	| {
			type: typeof VaultConnectorType.Hashicorp;
			options: IHashicorpVaultConnectorConstructorOptions;
	  };
