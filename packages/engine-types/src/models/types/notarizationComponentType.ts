// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Notarization component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotarizationComponentType = {
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
 * Notarization component types.
 */
export type NotarizationComponentType =
	(typeof NotarizationComponentType)[keyof typeof NotarizationComponentType];
