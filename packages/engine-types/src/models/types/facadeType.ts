// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Facade types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
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
