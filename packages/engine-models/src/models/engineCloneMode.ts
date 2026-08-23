// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Controls whether a type config entry is included when creating a clone.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EngineCloneMode = {
	/**
	 * Always include this entry in a clone, even when a types allowlist is provided.
	 */
	Always: "always",

	/**
	 * Include this entry in a clone unless excluded by a types allowlist.
	 */
	Optional: "optional",

	/**
	 * Never include this entry in a clone.
	 */
	Never: "never"
} as const;

/**
 * Controls whether a type config entry is included when creating a clone.
 */
export type EngineCloneMode = (typeof EngineCloneMode)[keyof typeof EngineCloneMode];
