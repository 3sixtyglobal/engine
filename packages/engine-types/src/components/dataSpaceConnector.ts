// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IDataSpaceConnector } from "@twin.org/data-space-connector-models";
import { DataSpaceConnectorRestClient } from "@twin.org/data-space-connector-rest-client";
import {
	type ActivityLogDetails,
	type ActivityTask,
	DataSpaceConnectorService,
	initSchema as initSchemaDataSpaceConnector
} from "@twin.org/data-space-connector-service";
import { DataSpaceConnectorSocketClient } from "@twin.org/data-space-connector-socket-client";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DataSpaceConnectorComponentConfig } from "../models/config/dataSpaceConnectorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DataSpaceConnectorComponentType } from "../models/types/dataSpaceConnectorComponentType.js";

/**
 * Initialise the data space connector component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseDataSpaceConnectorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataSpaceConnectorComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IDataSpaceConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === DataSpaceConnectorComponentType.Service) {
		initSchemaDataSpaceConnector();

		const partitionContextIds = ContextIdHelper.pickKeysFromAvailable(
			engineCore.getContextIdKeys(),
			[ContextIdKeys.Node, ContextIdKeys.Tenant]
		);

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
		component = new DataSpaceConnectorService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			backgroundTaskComponentType: engineCore.getRegisteredInstanceType("backgroundTaskComponent"),
			taskSchedulerComponentType: engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
			federatedCatalogueComponentType: engineCore.getRegisteredInstanceType(
				"federatedCatalogueComponent"
			),
			partitionContextIds,
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(DataSpaceConnectorService);
	} else if (instanceConfig.type === DataSpaceConnectorComponentType.RestClient) {
		component = new DataSpaceConnectorRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(DataSpaceConnectorRestClient);
	} else if (instanceConfig.type === DataSpaceConnectorComponentType.SocketClient) {
		component = new DataSpaceConnectorSocketClient({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(DataSpaceConnectorSocketClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
