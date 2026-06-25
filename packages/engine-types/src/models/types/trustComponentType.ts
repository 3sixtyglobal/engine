// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Trust component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
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
