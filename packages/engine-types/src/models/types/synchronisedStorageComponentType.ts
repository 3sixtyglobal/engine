// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Synchronised storage component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SynchronisedStorageComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Synchronised storage component types.
 */
export type SynchronisedStorageComponentType =
	(typeof SynchronisedStorageComponentType)[keyof typeof SynchronisedStorageComponentType];
