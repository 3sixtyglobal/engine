// Copyright 2025 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IDataspaceControlPlaneServiceConstructorOptions } from "@twin.org/dataspace-control-plane-service";
import type { DataspaceControlPlaneComponentType } from "../types/dataspaceControlPlaneComponentType.js";

/**
 * Dataspace control plane component config types.
 */
export type DataspaceControlPlaneComponentConfig =
	| {
			type: typeof DataspaceControlPlaneComponentType.Service;
			options?: IDataspaceControlPlaneServiceConstructorOptions;
	  }
	| {
			type: typeof DataspaceControlPlaneComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
