// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IIdentityAllowDenyVerifierConstructorOptions,
	IJwtVerifiableCredentialVerifierConstructorOptions
} from "@twin.org/trust-verifiers";
import type { TrustVerifierComponentType } from "../types/trustVerifierComponentType.js";

/**
 * Trust verifier component config types.
 */
export type TrustVerifierComponentConfig =
	| {
			type: typeof TrustVerifierComponentType.JwtVerifiableCredential;
			options?: IJwtVerifiableCredentialVerifierConstructorOptions;
	  }
	| {
			type: typeof TrustVerifierComponentType.IdentityAllowDeny;
			options?: IIdentityAllowDenyVerifierConstructorOptions;
	  };
