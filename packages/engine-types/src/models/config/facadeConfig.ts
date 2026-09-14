// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITracingFacadeConstructorOptions } from "@twin.org/tracing-facades";
import type { FacadeType } from "../types/facadeType.js";

/**
 * Facade config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type FacadeConfig = {
	type: typeof FacadeType.Tracing;
	options?: ITracingFacadeConstructorOptions;
};
