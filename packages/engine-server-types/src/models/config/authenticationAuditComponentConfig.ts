// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationAuditServiceConstructorOptions } from "@3sixty/api-auth-entity-storage-service";
import type { AuthenticationAuditComponentType } from "../types/authenticationAuditComponentType.js";

/**
 * Authentication audit component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthenticationAuditComponentConfig = {
	type: typeof AuthenticationAuditComponentType.EntityStorage;
	options?: IEntityStorageAuthenticationAuditServiceConstructorOptions;
};
