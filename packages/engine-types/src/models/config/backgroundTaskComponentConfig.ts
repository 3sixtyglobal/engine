// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBackgroundTaskServiceConstructorOptions } from "@3sixty/background-task-service";
import type { BackgroundTaskComponentType } from "../types/backgroundTaskComponentType.js";

/**
 * Background task component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BackgroundTaskComponentConfig = {
	type: typeof BackgroundTaskComponentType.Service;
	options?: IBackgroundTaskServiceConstructorOptions;
};
