// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import { DataSpaceConnectorRestClient } from "@twin.org/data-space-connector-rest-client";
import {
	type ActivityLogDetails,
	type ActivityTask,
	DataSpaceConnectorService,
	initSchema as initSchemaDataSpaceConnector
} from "@twin.org/data-space-connector-service";
import { DataSpaceConnectorSocketClient } from "@twin.org/data-space-connector-socket-client";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DataSpaceConnectorComponentConfig } from "../models/config/dataSpaceConnectorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DataSpaceConnectorComponentType } from "../models/types/dataSpaceConnectorComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the data space connector component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseDataSpaceConnectorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataSpaceConnectorComponentConfig
): EngineTypeInitialiserReturn<DataSpaceConnectorComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === DataSpaceConnectorComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaDataSpaceConnector();

			const partitionContextIds = ContextIdHelper.pickKeysFromAvailable(
				engineCore.getContextIdKeys(),
				[ContextIdKeys.Node, ContextIdKeys.Tenant]
			);

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.activityLogEntityStorageType,
				nameof<ActivityLogDetails>(),
				partitionContextIds
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.activityTaskEntityStorageType,
				nameof<ActivityTask>(),
				partitionContextIds
			);
			return new DataSpaceConnectorService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
						backgroundTaskComponentType:
							engineCore.getRegisteredInstanceType("backgroundTaskComponent"),
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						trustComponentType: engineCore.getRegisteredInstanceType("trustComponent"),
						partitionContextIds
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(DataSpaceConnectorService);
	} else if (instanceConfig.type === DataSpaceConnectorComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DataSpaceConnectorRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(DataSpaceConnectorRestClient);
	} else if (instanceConfig.type === DataSpaceConnectorComponentType.SocketClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DataSpaceConnectorSocketClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(DataSpaceConnectorSocketClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
