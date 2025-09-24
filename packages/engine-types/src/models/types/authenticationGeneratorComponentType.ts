// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Authentication generator component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthenticationGeneratorComponentType = {
	/**
	 * Verifiable Credential.
	 */
	VerifiableCredential: "verifiable-credential"
} as const;

/**
 * Authentication generator component types.
 */
export type AuthenticationGeneratorComponentType =
	(typeof AuthenticationGeneratorComponentType)[keyof typeof AuthenticationGeneratorComponentType];
