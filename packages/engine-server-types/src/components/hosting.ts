// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { HostingService } from "@twin.org/api-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { EngineTypeHelper } from "@twin.org/engine-types";
import { nameofKebabCase } from "@twin.org/nameof";
import type { HostingComponentConfig } from "../models/config/hostingComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { HostingComponentType } from "../models/types/hostingComponentType.js";

/**
 * Initialise the hosting component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseHostingComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: HostingComponentConfig
): EngineTypeInitialiserReturn<HostingComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === HostingComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new HostingService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						tenantAdminComponentType:
							engineCore.getRegisteredInstanceTypeOptional("tenantAdminComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(HostingService);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
