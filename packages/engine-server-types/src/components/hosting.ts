// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHostingComponent } from "@twin.org/api-models";
import { HostingService } from "@twin.org/api-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
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
export async function initialiseHostingComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: HostingComponentConfig
): Promise<{ instanceType?: string; factory?: typeof ComponentFactory; component?: IComponent }> {
	let component: IHostingComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === HostingComponentType.Service) {
		component = new HostingService({
			tenantAdminComponentType:
				engineCore.getRegisteredInstanceTypeOptional("tenantAdminComponent"),
			config: instanceConfig.options.config
		});
		instanceType = nameofKebabCase(HostingService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
