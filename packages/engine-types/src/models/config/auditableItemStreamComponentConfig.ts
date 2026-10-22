// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IAuditableItemStreamServiceConstructorOptions } from "@3sixty/auditable-item-stream-service";
import type { AuditableItemStreamComponentType } from "../types/auditableItemStreamComponentType.js";

/**
 * Auditable item stream component config types.
 */
export type AuditableItemStreamComponentConfig =
	| {
			type: typeof AuditableItemStreamComponentType.Service;
			options?: IAuditableItemStreamServiceConstructorOptions;
	  }
	| {
			type: typeof AuditableItemStreamComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
