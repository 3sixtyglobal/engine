// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IFilterByMetadataConstructorOptions } from "@twin.org/federated-catalogue-filters";
import type { FederatedCatalogueFilterComponentType } from "../types/federatedCatalogueFilterComponentType.js";

/**
 * Federated catalog filter component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type FederatedCatalogueFilterComponentConfig = {
	type: typeof FederatedCatalogueFilterComponentType.FilterByMetadata;
	options: IFilterByMetadataConstructorOptions;
};
