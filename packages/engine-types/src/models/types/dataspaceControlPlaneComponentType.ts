// Copyright 2025 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Dataspace control plane component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DataspaceControlPlaneComponentType = {
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
 * Dataspace control plane component types.
 */
export type DataspaceControlPlaneComponentType =
	(typeof DataspaceControlPlaneComponentType)[keyof typeof DataspaceControlPlaneComponentType];
