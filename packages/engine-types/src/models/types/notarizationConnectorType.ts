// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Notarization connector types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotarizationConnectorType = {
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
 * Notarization connector types.
 */
export type NotarizationConnectorType =
	(typeof NotarizationConnectorType)[keyof typeof NotarizationConnectorType];
