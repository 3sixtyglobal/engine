// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Feature component types.
 */
export const FeatureComponentType = {
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
 * Feature component types.
 */
export type FeatureComponentType = (typeof FeatureComponentType)[keyof typeof FeatureComponentType];
