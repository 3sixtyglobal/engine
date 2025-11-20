// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ContextIdHandlerComponentType } from "../types/contextIdHandlerComponentType.js";

/**
 * Context Id Handler component config types.
 */
export type ContextIdHandlerComponentConfig =
	| {
			type: typeof ContextIdHandlerComponentType.Did;
			options?: never;
	  }
	| {
			type: typeof ContextIdHandlerComponentType.Tenant;
			options?: never;
	  };
