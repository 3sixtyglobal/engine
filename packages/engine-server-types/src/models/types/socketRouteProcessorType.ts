// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Socket route processor types.
 */
export const SocketRouteProcessorType = {
	/**
	 * Auth header.
	 */
	AuthHeader: "auth-header",

	/**
	 * Authentication account, sets the identity and organization of the signed in account.
	 */
	AuthenticationAccount: "authentication-account",

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
	SocketRoute: "socket-route",

	/**
	 * Authorization.
	 */
	Authorization: "authorization",

	/**
	 * Origin check, rejects cookie authenticated socket connections from other origins.
	 */
	OriginCheck: "origin-check"
} as const;

/**
 * Socket route processor types.
 */
export type SocketRouteProcessorType =
	(typeof SocketRouteProcessorType)[keyof typeof SocketRouteProcessorType];
