// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IDocumentManagementServiceConstructorOptions } from "@3sixty/document-management-service";
import type { DocumentManagementComponentType } from "../types/documentManagementComponentType.js";

/**
 * Document management component config types.
 */
export type DocumentManagementComponentConfig =
	| {
			type: typeof DocumentManagementComponentType.Service;
			options?: IDocumentManagementServiceConstructorOptions;
	  }
	| {
			type: typeof DocumentManagementComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
