// Copyright 2025 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IDataspaceDataPlaneServiceConstructorOptions } from "@twin.org/dataspace-data-plane-service";
import type { IDataspaceDataPlaneSocketClientConstructorOptions } from "@twin.org/dataspace-data-plane-socket-client";
import type { DataspaceDataPlaneComponentType } from "../types/dataspaceDataPlaneComponentType.js";

/**
 * Dataspace data plane component config types.
 */
export type DataspaceDataPlaneComponentConfig =
	| {
			type: typeof DataspaceDataPlaneComponentType.Service;
			options?: IDataspaceDataPlaneServiceConstructorOptions;
	  }
	| {
			type: typeof DataspaceDataPlaneComponentType.RestClient;
			options: IBaseRestClientConfig;
	  }
	| {
			type: typeof DataspaceDataPlaneComponentType.SocketClient;
			options: IDataspaceDataPlaneSocketClientConstructorOptions;
	  };
