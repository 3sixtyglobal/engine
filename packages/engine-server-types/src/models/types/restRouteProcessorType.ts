// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.

/**
 * REST route processor types.
 */
export const RestRouteProcessorType = {
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
	 * REST Route.
	 */
	RestRoute: "rest-route",

	/**
	 * Metrics.
	 */
	Metrics: "metrics",

	/**
	 * Tracing.
	 */
	Tracing: "tracing",

	/**
	 * Authorization.
	 */
	Authorization: "authorization",

	/**
	 * Origin check, rejects cookie authenticated state changing requests from other origins.
	 */
	OriginCheck: "origin-check"
} as const;

/**
 * REST route processor types.
 */
export type RestRouteProcessorType =
	(typeof RestRouteProcessorType)[keyof typeof RestRouteProcessorType];
