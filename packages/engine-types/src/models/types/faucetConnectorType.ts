// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Faucet connector types.
 */
export const FaucetConnectorType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * IOTA.
	 */
	Iota: "iota"
} as const;

/**
 * Faucet connector types.
 */
export type FaucetConnectorType = (typeof FaucetConnectorType)[keyof typeof FaucetConnectorType];
