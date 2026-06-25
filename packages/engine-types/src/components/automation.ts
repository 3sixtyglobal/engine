// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AutomationRestClient } from "@twin.org/automation-rest-client";
import {
	type AutomationActionEntry,
	AutomationService,
	initSchema
} from "@twin.org/automation-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { AutomationComponentConfig } from "../models/config/automationComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { AutomationComponentType } from "../models/types/automationComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the automation component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAutomationComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AutomationComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AutomationComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.automationActionEntryStorageType,
				nameof<AutomationActionEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new AutomationService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(nameof(AutomationService))
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(AutomationService);
	} else if (instanceConfig.type === AutomationComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AutomationRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(AutomationRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
