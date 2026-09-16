// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IConsoleTracingConnectorConstructorOptions } from "@twin.org/tracing-connector-console";
import type { IEntityStorageTracingConnectorConstructorOptions } from "@twin.org/tracing-connector-entity-storage";
import type { IOpenTelemetryTracingConnectorConstructorOptions } from "@twin.org/tracing-connector-opentelemetry";
import type { IMultiTracingConnectorConstructorOptions } from "@twin.org/tracing-models";
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
