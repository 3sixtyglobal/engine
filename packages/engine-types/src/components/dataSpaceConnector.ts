// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IDataSpaceConnector } from "@twin.org/data-space-connector-models";
import { DataSpaceConnectorClient } from "@twin.org/data-space-connector-rest-client";
import {
	type ActivityLogDetails,
	type ActivityTask,
	DataSpaceConnectorService,
	initSchema as initSchemaDataSpaceConnector
} from "@twin.org/data-space-connector-service";
import { DataSpaceConnectorSocketClient } from "@twin.org/data-space-connector-socket-client";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { DataSpaceConnectorComponentConfig } from "../models/config/dataSpaceConnectorComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { DataSpaceConnectorComponentType } from "../models/types/dataSpaceConnectorComponentType";

/**
 * Initialise the data space connector component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseDataSpaceConnectorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataSpaceConnectorComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Data Space Connector Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IDataSpaceConnector;
	let instanceType: string;

	if (type === DataSpaceConnectorComponentType.Service) {
		initSchemaDataSpaceConnector();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.activityLogEntityStorageType,
			nameof<ActivityLogDetails>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.activityTaskEntityStorageType,
			nameof<ActivityTask>()
		);
		component = new DataSpaceConnectorService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			backgroundTaskConnectorType: engineCore.getRegisteredInstanceType("backgroundTaskConnector"),
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(DataSpaceConnectorService));
	} else if (type === DataSpaceConnectorComponentType.RestClient) {
		component = new DataSpaceConnectorClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(DataSpaceConnectorClient));
	} else if (type === DataSpaceConnectorComponentType.SocketClient) {
		component = new DataSpaceConnectorSocketClient({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(DataSpaceConnectorSocketClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "DataSpaceConnectorComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({ instanceType: finalInstanceType, component });
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
