// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * URL transformer component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const UrlTransformerComponentType = {
	/**
	 * Service.
	 */
	Service: "service"
} as const;

/**
 * URL transformer component types.
 */
export type UrlTransformerComponentType =
	(typeof UrlTransformerComponentType)[keyof typeof UrlTransformerComponentType];
