// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Background task component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BackgroundTaskComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * Background task component types.
 */
export type BackgroundTaskComponentType =
	(typeof BackgroundTaskComponentType)[keyof typeof BackgroundTaskComponentType];
