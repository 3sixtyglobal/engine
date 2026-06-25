// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IFetchActionConstructorOptions } from "@twin.org/automation-actions";
import type { AutomationActionType } from "../types/automationActionType.js";

/**
 * Automation action configuration.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AutomationActionConfig = {
	type: typeof AutomationActionType.Fetch;
	options: IFetchActionConstructorOptions;
};
