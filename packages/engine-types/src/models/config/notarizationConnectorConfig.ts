// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageNotarizationConnectorConstructorOptions } from "@3sixty/notarization-connector-entity-storage";
import type { IIotaNotarizationConnectorConstructorOptions } from "@3sixty/notarization-connector-iota";
import type { NotarizationConnectorType } from "../types/notarizationConnectorType.js";

/**
 * Notarization connector configuration.
 */
export type NotarizationConnectorConfig =
	| {
			type: typeof NotarizationConnectorType.EntityStorage;
			options?: IEntityStorageNotarizationConnectorConstructorOptions;
	  }
	| {
			type: typeof NotarizationConnectorType.Iota;
			options: IIotaNotarizationConnectorConstructorOptions;
	  };
