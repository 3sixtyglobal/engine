// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IConsoleLoggingConnectorConstructorOptions } from "@twin.org/logging-connector-console";
import type { IEntityStorageLoggingConnectorConstructorOptions } from "@twin.org/logging-connector-entity-storage";
import type { IFileLoggingConnectorConstructorOptions } from "@twin.org/logging-connector-file";
import type { IOpenTelemetryLoggingConnectorConstructorOptions } from "@twin.org/logging-connector-opentelemetry";
import type { IMultiLoggingConnectorConstructorOptions } from "@twin.org/logging-models";
import type { LoggingConnectorType } from "../types/loggingConnectorType.js";

/**
 * Logging config connector types.
 */
export type LoggingConnectorConfig =
	| {
			type: typeof LoggingConnectorType.EntityStorage;
			options?: IEntityStorageLoggingConnectorConstructorOptions;
	  }
	| {
			type: typeof LoggingConnectorType.Console;
			options?: IConsoleLoggingConnectorConstructorOptions;
	  }
	| {
			type: typeof LoggingConnectorType.Multi;
			options: IMultiLoggingConnectorConstructorOptions;
	  }
	| {
			type: typeof LoggingConnectorType.OpenTelemetry;
			options?: IOpenTelemetryLoggingConnectorConstructorOptions;
	  }
	| {
			type: typeof LoggingConnectorType.File;
			options: IFileLoggingConnectorConstructorOptions;
	  };
