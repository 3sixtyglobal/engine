// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Platform component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
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
