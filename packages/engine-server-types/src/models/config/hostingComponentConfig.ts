// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHostingServiceConstructorOptions } from "@twin.org/api-service";
import type { HostingComponentType } from "../types/hostingComponentType.js";

/**
 * Hosting component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HostingComponentConfig = {
	type: typeof HostingComponentType.Service;
	options: IHostingServiceConstructorOptions;
};
