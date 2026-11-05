// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Trust component types.
 */
export const TrustComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Trust component types.
 */
export type TrustComponentType = (typeof TrustComponentType)[keyof typeof TrustComponentType];
