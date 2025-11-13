// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITaskSchedulerComponent } from "@twin.org/background-task-models";
import { TaskSchedulerService } from "@twin.org/background-task-scheduler";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { TaskSchedulerComponentConfig } from "../models/config/taskSchedulerComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TaskSchedulerComponentType } from "../models/types/taskSchedulerComponentType.js";

/**
 * Initialise a task scheduler.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseTaskSchedulerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TaskSchedulerComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: ITaskSchedulerComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === TaskSchedulerComponentType.Service) {
		component = new TaskSchedulerService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(TaskSchedulerService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
