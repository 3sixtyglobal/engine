// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Platform component types.
 */
export const PlatformComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Platform component types.
 */
export type PlatformComponentType =
	(typeof PlatformComponentType)[keyof typeof PlatformComponentType];
