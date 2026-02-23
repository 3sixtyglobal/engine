// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	initSchema,
	TaskSchedulerService,
	type ScheduledTask
} from "@twin.org/background-task-scheduler";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { TaskSchedulerComponentConfig } from "../models/config/taskSchedulerComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TaskSchedulerComponentType } from "../models/types/taskSchedulerComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a task scheduler.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTaskSchedulerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TaskSchedulerComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TaskSchedulerComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.scheduledTaskEntityStorageType,
				nameof<ScheduledTask>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
			);

			return new TaskSchedulerService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent") },
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(TaskSchedulerService);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
