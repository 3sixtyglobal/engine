// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IConsoleLoggingConnectorConstructorOptions } from "@3sixty/logging-connector-console";
import type { IElkLoggingConnectorConstructorOptions } from "@3sixty/logging-connector-elk";
import type { IEntityStorageLoggingConnectorConstructorOptions } from "@3sixty/logging-connector-entity-storage";
import type { IFileLoggingConnectorConstructorOptions } from "@3sixty/logging-connector-file";
import type { IOpenTelemetryLoggingConnectorConstructorOptions } from "@3sixty/logging-connector-opentelemetry";
import type { IMultiLoggingConnectorConstructorOptions } from "@3sixty/logging-models";
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
	  }
	| {
			type: typeof LoggingConnectorType.Elk;
			options: IElkLoggingConnectorConstructorOptions;
	  };
