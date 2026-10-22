// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Web server types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const WebServerType = {
	/**
	 * Fastify.
	 */
	Fastify: "fastify",

	/**
	 * Hono.
	 */
	Hono: "hono",

	/**
	 * Native Node.js.
	 */
	Native: "native"
} as const;

/**
 * Web server types.
 */
export type WebServerType = (typeof WebServerType)[keyof typeof WebServerType];
