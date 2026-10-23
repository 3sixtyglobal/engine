// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ICasbinAuthorizationConnectorConstructorOptions } from "@3sixty/authorization-connector-casbin";
import type { IEntityStorageAuthorizationConnectorConstructorOptions } from "@3sixty/authorization-connector-entity-storage";
import type { AuthorizationConnectorType } from "../types/authorizationConnectorType.js";

/**
 * Authorization connector configuration.
 */
export type AuthorizationConnectorConfig =
	| {
			type: typeof AuthorizationConnectorType.EntityStorage;
			options?: IEntityStorageAuthorizationConnectorConstructorOptions;
	  }
	| {
			type: typeof AuthorizationConnectorType.Casbin;
			options: ICasbinAuthorizationConnectorConstructorOptions;
	  };
