// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationRateServiceConstructorOptions } from "@twin.org/api-auth-entity-storage-service";
import type { AuthenticationRateComponentType } from "../types/authenticationRateComponentType.js";

/**
 * Authentication rate component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthenticationRateComponentConfig = {
	type: typeof AuthenticationRateComponentType.EntityStorage;
	options?: IEntityStorageAuthenticationRateServiceConstructorOptions;
};
