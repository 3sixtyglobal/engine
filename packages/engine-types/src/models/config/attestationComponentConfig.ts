// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IAttestationServiceConstructorOptions } from "@twin.org/attestation-service";
import type { AttestationComponentType } from "../types/attestationComponentType.js";

/**
 * Attestation component config types.
 */
export type AttestationComponentConfig =
	| {
			type: typeof AttestationComponentType.Service;
			options?: IAttestationServiceConstructorOptions;
	  }
	| {
			type: typeof AttestationComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
