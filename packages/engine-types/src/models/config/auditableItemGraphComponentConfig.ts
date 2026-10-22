// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IAuditableItemGraphServiceConstructorOptions } from "@3sixty/auditable-item-graph-service";
import type { AuditableItemGraphComponentType } from "../types/auditableItemGraphComponentType.js";

/**
 * Auditable item graph component config types.
 */
export type AuditableItemGraphComponentConfig =
	| {
			type: typeof AuditableItemGraphComponentType.Service;
			options?: IAuditableItemGraphServiceConstructorOptions;
	  }
	| {
			type: typeof AuditableItemGraphComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
