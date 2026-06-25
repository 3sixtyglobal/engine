// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Trust generator component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TrustGeneratorComponentType = {
	/**
	 * JWT Verifiable Credential.
	 */
	JwtVerifiableCredential: "jwt-verifiable-credential"
} as const;

/**
 * Trust generator component types.
 */
export type TrustGeneratorComponentType =
	(typeof TrustGeneratorComponentType)[keyof typeof TrustGeneratorComponentType];
