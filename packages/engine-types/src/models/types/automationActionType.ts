// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Automation action types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutomationActionType = {
	/**
	 * Fetch action.
	 */
	Fetch: "fetch"
} as const;

/**
 * Automation action types.
 */
export type AutomationActionType = (typeof AutomationActionType)[keyof typeof AutomationActionType];
