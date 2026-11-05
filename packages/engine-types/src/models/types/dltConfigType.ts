// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * DLT config types.
 */
export const DltConfigType = {
	/**
	 * IOTA.
	 */
	Iota: "iota"
} as const;

/**
 * DLT config types.
 */
export type DltConfigType = (typeof DltConfigType)[keyof typeof DltConfigType];
