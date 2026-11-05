// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * OAuth component types.
 */
export const OAuthComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * OAuth component types.
 */
export type OAuthComponentType = (typeof OAuthComponentType)[keyof typeof OAuthComponentType];
