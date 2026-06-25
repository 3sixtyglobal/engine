// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { INotarizationServiceConstructorOptions } from "@twin.org/notarization-service";
import type { NotarizationComponentType } from "../types/notarizationComponentType.js";

/**
 * Notarization component configuration.
 */
export type NotarizationComponentConfig =
	| {
			type: typeof NotarizationComponentType.Service;
			options?: INotarizationServiceConstructorOptions;
	  }
	| {
			type: typeof NotarizationComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
