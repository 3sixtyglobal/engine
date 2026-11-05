// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Event bus component types.
 */
export const EventBusComponentType = {
	/**
	 * Service.
	 */
	Service: "service",

	/**
	 * Socket client.
	 */
	SocketClient: "socket-client"
} as const;

/**
 * Event bus component types.
 */
export type EventBusComponentType =
	(typeof EventBusComponentType)[keyof typeof EventBusComponentType];
