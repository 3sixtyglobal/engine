// Copyright 2025 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Dataspace data plane component types.
 */
export const DataspaceDataPlaneComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * REST client.
	 */
	RestClient: "rest-client",

	/**
	 * Socket client.
	 */
	SocketClient: "socket-client"
} as const;

/**
 * Dataspace data plane component types.
 */
export type DataspaceDataPlaneComponentType =
	(typeof DataspaceDataPlaneComponentType)[keyof typeof DataspaceDataPlaneComponentType];
