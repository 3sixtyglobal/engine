// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IPlatformServiceConstructorOptions } from "@twin.org/api-service";
import type { PlatformComponentType } from "../types/platformComponentType.js";

/**
 * Platform component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PlatformComponentConfig = {
	type: typeof PlatformComponentType.Service;
	options?: IPlatformServiceConstructorOptions;
};
