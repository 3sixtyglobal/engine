// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IJwtVerifiableCredentialVerifierConstructorOptions } from "@twin.org/trust-verifiers";
import type { TrustVerifierComponentType } from "../types/trustVerifierComponentType.js";

/**
 * Trust verifier component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TrustVerifierComponentConfig = {
	type: typeof TrustVerifierComponentType.JwtVerifiableCredential;
	options?: IJwtVerifiableCredentialVerifierConstructorOptions;
};
