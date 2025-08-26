// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Data space connector component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DataSpaceConnectorComponentType = {
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
 * Data space connector component types.
 */
export type DataSpaceConnectorComponentType =
	(typeof DataSpaceConnectorComponentType)[keyof typeof DataSpaceConnectorComponentType];
