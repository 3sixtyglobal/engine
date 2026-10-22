// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageTelemetryConnectorConstructorOptions } from "@3sixty/telemetry-connector-entity-storage";
import type { IOpenTelemetryTelemetryConnectorConstructorOptions } from "@3sixty/telemetry-connector-opentelemetry";
import type { IMultiTelemetryConnectorConstructorOptions } from "@3sixty/telemetry-models";
import type { TelemetryConnectorType } from "../types/telemetryConnectorType.js";

/**
 * Telemetry connector config types.
 */
export type TelemetryConnectorConfig =
	| {
			type: typeof TelemetryConnectorType.EntityStorage;
			options?: IEntityStorageTelemetryConnectorConstructorOptions;
	  }
	| {
			type: typeof TelemetryConnectorType.OpenTelemetry;
			options?: IOpenTelemetryTelemetryConnectorConstructorOptions;
	  }
	| {
			type: typeof TelemetryConnectorType.Multi;
			options: IMultiTelemetryConnectorConstructorOptions;
	  }
	| {
			type: typeof TelemetryConnectorType.Silent;
			options?: never;
	  };
