// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { FetchAction } from "@twin.org/automation-actions";
import { AutomationActionFactory } from "@twin.org/automation-models";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { AutomationActionConfig } from "../models/config/automationActionConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { AutomationActionType } from "../models/types/automationActionType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the automation actions.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAutomationAction(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AutomationActionConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof AutomationActionFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AutomationActionType.Fetch) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new FetchAction(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(FetchAction)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(FetchAction);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: AutomationActionFactory
	};
}
