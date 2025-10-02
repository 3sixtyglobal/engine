// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	EntityStorageBackgroundTaskConnector,
	initSchema,
	type BackgroundTask
} from "@twin.org/background-task-connector-entity-storage";
import {
	BackgroundTaskConnectorFactory,
	type IBackgroundTaskConnector
} from "@twin.org/background-task-models";
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { BackgroundTaskConnectorConfig } from "../models/config/backgroundTaskConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { BackgroundTaskConnectorType } from "../models/types/backgroundTaskConnectorType";

/**
 * Initialise a background task connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseBackgroundTaskConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BackgroundTaskConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof BackgroundTaskConnectorFactory;
	component?: IComponent;
}> {
	let component: IBackgroundTaskConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === BackgroundTaskConnectorType.EntityStorage) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.backgroundTaskEntityStorageType,
			nameof<BackgroundTask>()
		);
		component = new EntityStorageBackgroundTaskConnector({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = EntityStorageBackgroundTaskConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: BackgroundTaskConnectorFactory
	};
}
