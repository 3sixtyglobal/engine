// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBackgroundTaskComponent } from "@twin.org/background-task-models";
import {
	BackgroundTaskService,
	initSchema,
	type BackgroundTask
} from "@twin.org/background-task-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { BackgroundTaskComponentConfig } from "../models/config/backgroundTaskComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { BackgroundTaskComponentType } from "../models/types/backgroundTaskComponentType.js";

/**
 * Initialise a background task component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseBackgroundTaskComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BackgroundTaskComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IBackgroundTaskComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === BackgroundTaskComponentType.Service) {
		initSchema();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.backgroundTaskEntityStorageType,
			nameof<BackgroundTask>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
		);
		component = new BackgroundTaskService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(BackgroundTaskService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
