// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IJwtVerifiableCredentialGeneratorConstructorOptions } from "@3sixty/trust-generators";
import type { TrustGeneratorComponentType } from "../types/trustGeneratorComponentType.js";

/**
 * Trust Generator component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TrustGeneratorComponentConfig = {
	type: typeof TrustGeneratorComponentType.JwtVerifiableCredential;
	options: IJwtVerifiableCredentialGeneratorConstructorOptions;
};
