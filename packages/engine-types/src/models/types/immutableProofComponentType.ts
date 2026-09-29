// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Immutable proof component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ImmutableProofComponentType = {
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
 * Immutable proof component types.
 */
export type ImmutableProofComponentType =
	(typeof ImmutableProofComponentType)[keyof typeof ImmutableProofComponentType];
