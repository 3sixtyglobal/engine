// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication audit component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthenticationAuditComponentType = {
	/**
	 * Entity storage.
	 */
	EntityStorage: "entity-storage"
} as const;

/**
 * Authentication audit component types.
 */
export type AuthenticationAuditComponentType =
	(typeof AuthenticationAuditComponentType)[keyof typeof AuthenticationAuditComponentType];
