// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IDataSpaceConnectorServiceConstructorOptions } from "@twin.org/data-space-connector-service";
import type { IDataSpaceConnectorSocketClientConstructorOptions } from "@twin.org/data-space-connector-socket-client";
import type { DataSpaceConnectorComponentType } from "../types/dataSpaceConnectorComponentType";

/**
 * Data space connector component config types.
 */
export type DataSpaceConnectorComponentConfig =
	| {
			type: typeof DataSpaceConnectorComponentType.Service;
			options?: IDataSpaceConnectorServiceConstructorOptions;
	  }
	| {
			type: typeof DataSpaceConnectorComponentType.RestClient;
			options: IBaseRestClientConfig;
	  }
	| {
			type: typeof DataSpaceConnectorComponentType.SocketClient;
			options: IDataSpaceConnectorSocketClientConstructorOptions;
	  };
