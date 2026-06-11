// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Federated catalogue filter component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FederatedCatalogueFilterComponentType = {
	/**
	 * Filter By Metadata.
	 */
	FilterByMetadata: "filter-by-metadata"
} as const;

/**
 * Federated catalogue filter component types.
 */
export type FederatedCatalogueFilterComponentType =
	(typeof FederatedCatalogueFilterComponentType)[keyof typeof FederatedCatalogueFilterComponentType];
