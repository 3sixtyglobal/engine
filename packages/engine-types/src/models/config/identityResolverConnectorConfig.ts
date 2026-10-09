// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageIdentityResolverConnectorConstructorOptions } from "@3sixty/identity-connector-entity-storage";
import type { IIotaIdentityResolverConnectorConstructorOptions } from "@3sixty/identity-connector-iota";
import type { IUniversalResolverConnectorConstructorOptions } from "@3sixty/identity-connector-universal";
import type { IdentityResolverConnectorType } from "../types/identityResolverConnectorType.js";

/**
 * Identity resolver config connector types.
 */
export type IdentityResolverConnectorConfig =
	| {
			type: typeof IdentityResolverConnectorType.EntityStorage;
			options?: IEntityStorageIdentityResolverConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityResolverConnectorType.Iota;
			options: IIotaIdentityResolverConnectorConstructorOptions;
	  }
	| {
			type: typeof IdentityResolverConnectorType.Universal;
			options: IUniversalResolverConnectorConstructorOptions;
	  };
