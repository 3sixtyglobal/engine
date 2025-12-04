// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Trust verifier component types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TrustVerifierComponentType = {
	/**
	 * JWT Verifiable Credential.
	 */
	JwtVerifiableCredential: "jwt-verifiable-credential"
} as const;

/**
 * Trust verifier component types.
 */
export type TrustVerifierComponentType =
	(typeof TrustVerifierComponentType)[keyof typeof TrustVerifierComponentType];
