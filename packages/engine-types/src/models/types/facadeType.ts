// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Facade types.
 */
export const FacadeType = {
	/**
	 * Tracing.
	 */
	Tracing: "tracing"
} as const;

/**
 * Facade types.
 */
export type FacadeType = (typeof FacadeType)[keyof typeof FacadeType];
