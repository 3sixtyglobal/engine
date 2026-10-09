// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IFederatedCatalogueServiceConstructorOptions } from "@3sixty/federated-catalogue-service";
import type { FederatedCatalogueComponentType } from "../types/federatedCatalogueComponentType.js";

/**
 * Federated catalog component config types.
 */
export type FederatedCatalogueComponentConfig =
	| {
			type: typeof FederatedCatalogueComponentType.Service;
			options: IFederatedCatalogueServiceConstructorOptions;
	  }
	| {
			type: typeof FederatedCatalogueComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
