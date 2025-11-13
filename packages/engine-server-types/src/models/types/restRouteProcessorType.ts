// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * REST route processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RestRouteProcessorType = {
	/**
	 * Auth header.
	 */
	AuthHeader: "auth-header",

	/**
	 * Auth verifiable credential.
	 */
	AuthVerifiableCredential: "auth-verifiable-credential",

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
	 * REST Route.
	 */
	RestRoute: "rest-route"
} as const;

/**
 * REST route processor types.
 */
export type RestRouteProcessorType =
	(typeof RestRouteProcessorType)[keyof typeof RestRouteProcessorType];
