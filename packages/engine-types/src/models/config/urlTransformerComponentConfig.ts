// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IUrlTransformerServiceConstructorOptions } from "@twin.org/api-service";
import type { UrlTransformerComponentType } from "../types/urlTransformerComponentType.js";

/**
 * URL transformer component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UrlTransformerComponentConfig = {
	type: typeof UrlTransformerComponentType.Service;
	options?: IUrlTransformerServiceConstructorOptions;
};
