// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Automation component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutomationComponentType = {
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
 * Automation component types.
 */
export type AutomationComponentType =
	(typeof AutomationComponentType)[keyof typeof AutomationComponentType];
