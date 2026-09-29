// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Socket route processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SocketRouteProcessorType = {
	/**
	 * Auth header.
	 */
	AuthHeader: "auth-header",

	/**
	 * Logging.
	 */
	Logging: "logging",

	/**
	 * Context ID.
	 */
	ContextId: "context-id",

	/**
	 * Static Context ID.
	 */
	StaticContextId: "static-context-id",

	/**
	 * Tenant.
	 */
	Tenant: "tenant",

	/**
	 * Single Tenant.
	 */
	SingleTenant: "single-tenant",

	/**
	 * Tenant override.
	 */
	TenantOverride: "tenant-override",

	/**
	 * Socket Route.
	 */
	SocketRoute: "socket-route"
} as const;

/**
 * Socket route processor types.
 */
export type SocketRouteProcessorType =
	(typeof SocketRouteProcessorType)[keyof typeof SocketRouteProcessorType];
