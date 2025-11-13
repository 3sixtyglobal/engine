// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IVerifiableCredentialAuthenticationGeneratorConstructorOptions } from "@twin.org/identity-authentication";
import type { AuthenticationGeneratorComponentType } from "../types/authenticationGeneratorComponentType.js";

/**
 * Authentication generator component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthenticationGeneratorComponentConfig = {
	type: typeof AuthenticationGeneratorComponentType.VerifiableCredential;
	options: IVerifiableCredentialAuthenticationGeneratorConstructorOptions;
};
