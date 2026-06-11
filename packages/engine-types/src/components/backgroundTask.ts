// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	BackgroundTaskService,
	initSchema,
	type BackgroundTask
} from "@twin.org/background-task-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { BackgroundTaskComponentConfig } from "../models/config/backgroundTaskComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { BackgroundTaskComponentType } from "../models/types/backgroundTaskComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise a background task component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseBackgroundTaskComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: BackgroundTaskComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === BackgroundTaskComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.backgroundTaskEntityStorageType,
				nameof<BackgroundTask>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
			);
			return new BackgroundTaskService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(nameof(BackgroundTaskService))
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(BackgroundTaskService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
