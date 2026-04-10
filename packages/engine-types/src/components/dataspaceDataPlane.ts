// Copyright 2025 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import { DataspaceDataPlaneRestClient } from "@twin.org/dataspace-data-plane-rest-client";
import {
	type ActivityLogDetails,
	type ActivityTask,
	DataspaceDataPlaneService,
	initSchema as initSchemaDataspaceDataPlane
} from "@twin.org/dataspace-data-plane-service";
import { DataspaceDataPlaneSocketClient } from "@twin.org/dataspace-data-plane-socket-client";
import type { TransferProcess } from "@twin.org/dataspace-models";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DataspaceDataPlaneComponentConfig } from "../models/config/dataspaceDataPlaneComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DataspaceDataPlaneComponentType } from "../models/types/dataspaceDataPlaneComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the dataspace data plane component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseDataspaceDataPlaneComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataspaceDataPlaneComponentConfig
): EngineTypeInitialiserReturn<DataspaceDataPlaneComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === DataspaceDataPlaneComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaDataspaceDataPlane();

			const partitionContextIds = ContextIdHelper.pickKeysFromAvailable(
				engineCore.getContextIdKeys(),
				[ContextIdKeys.Node, ContextIdKeys.Tenant]
			);

			// Initialize entity storage for ActivityLogDetails and ActivityTask
			initialiseEntityStorageConnector(
				engineCore,
				context,
				instanceConfig.options?.activityLogEntityStorageType,
				nameof<ActivityLogDetails>(),
				partitionContextIds
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				instanceConfig.options?.activityTaskEntityStorageType,
				nameof<ActivityTask>(),
				partitionContextIds
			);

			// TransferProcessEntity storage is shared with Control Plane.
			initialiseEntityStorageConnector(
				engineCore,
				context,
				instanceConfig.options?.transferProcessEntityStorageType,
				nameof<TransferProcess>(),
				partitionContextIds
			);

			return new DataspaceDataPlaneService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceTypeOptional("loggingComponent"),
						backgroundTaskComponentType:
							engineCore.getRegisteredInstanceTypeOptional("backgroundTaskComponent"),
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceTypeOptional("taskSchedulerComponent"),
						trustComponentType: engineCore.getRegisteredInstanceTypeOptional("trustComponent"),
						pepComponentType: engineCore.getRegisteredInstanceTypeOptional(
							"rightsManagementPepComponent"
						),
						tenantAdminType: engineCore.getRegisteredInstanceTypeOptional("tenantAdminComponent"),
						partitionContextIds
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(DataspaceDataPlaneService);
	} else if (instanceConfig.type === DataspaceDataPlaneComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DataspaceDataPlaneRestClient(createConfig.options);
		instanceTypeName = nameofKebabCase(DataspaceDataPlaneRestClient);
	} else if (instanceConfig.type === DataspaceDataPlaneComponentType.SocketClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DataspaceDataPlaneSocketClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceTypeOptional("loggingComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(DataspaceDataPlaneSocketClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
