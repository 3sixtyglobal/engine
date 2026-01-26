// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Hosting component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HostingComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Hosting component types.
 */
export type HostingComponentType = (typeof HostingComponentType)[keyof typeof HostingComponentType];
