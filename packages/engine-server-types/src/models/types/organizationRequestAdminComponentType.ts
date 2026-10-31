// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Organization request admin component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrganizationRequestAdminComponentType = {
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
 * Organization request admin component types.
 */
export type OrganizationRequestAdminComponentType =
	(typeof OrganizationRequestAdminComponentType)[keyof typeof OrganizationRequestAdminComponentType];
