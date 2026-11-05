// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Web server types.
 */
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
