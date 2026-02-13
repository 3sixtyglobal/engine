// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { TaskSchedulerService } from "@twin.org/background-task-scheduler";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
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
		createComponent = (createConfig: typeof instanceConfig) =>
			new TaskSchedulerService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent") },
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(TaskSchedulerService);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
