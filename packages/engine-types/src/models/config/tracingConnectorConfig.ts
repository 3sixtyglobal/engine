// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IConsoleTracingConnectorConstructorOptions } from "@3sixty/tracing-connector-console";
import type { IEntityStorageTracingConnectorConstructorOptions } from "@3sixty/tracing-connector-entity-storage";
import type { IOpenTelemetryTracingConnectorConstructorOptions } from "@3sixty/tracing-connector-opentelemetry";
import type { IMultiTracingConnectorConstructorOptions } from "@3sixty/tracing-models";
import type { TracingConnectorType } from "../types/tracingConnectorType.js";

/**
 * Tracing connector config types.
 */
export type TracingConnectorConfig =
	| {
			type: typeof TracingConnectorType.EntityStorage;
			options?: IEntityStorageTracingConnectorConstructorOptions;
	  }
	| {
			type: typeof TracingConnectorType.OpenTelemetry;
			options?: IOpenTelemetryTracingConnectorConstructorOptions;
	  }
	| {
			type: typeof TracingConnectorType.Console;
			options?: IConsoleTracingConnectorConstructorOptions;
	  }
	| {
			type: typeof TracingConnectorType.Multi;
			options: IMultiTracingConnectorConstructorOptions;
	  }
	| {
			type: typeof TracingConnectorType.Silent;
			options?: never;
	  };
