// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ICasbinAuthorizationConnectorConstructorOptions } from "@twin.org/authorization-connector-casbin";
import type { IEntityStorageAuthorizationConnectorConstructorOptions } from "@twin.org/authorization-connector-entity-storage";
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
