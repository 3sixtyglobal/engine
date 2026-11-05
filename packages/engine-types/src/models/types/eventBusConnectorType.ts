// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Event bus connector types.
 */
export const EventBusConnectorType = {
	/**
	 * Local.
	 */
	Local: "local"
} as const;

/**
 * Event bus connector types.
 */
export type EventBusConnectorType =
	(typeof EventBusConnectorType)[keyof typeof EventBusConnectorType];
