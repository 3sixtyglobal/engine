// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Organization component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrganizationComponentType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage",

	/**
	 * REST client.
	 */
	RestClient: "rest-client"
} as const;

/**
 * Organization component types.
 */
export type OrganizationComponentType =
	(typeof OrganizationComponentType)[keyof typeof OrganizationComponentType];
