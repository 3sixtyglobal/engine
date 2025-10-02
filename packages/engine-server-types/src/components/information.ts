// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IInformationComponent } from "@twin.org/api-models";
import { InformationClient } from "@twin.org/api-rest-client";
import { InformationService } from "@twin.org/api-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { InformationComponentConfig } from "../models/config/informationComponentConfig";
import type { IEngineServerConfig } from "../models/IEngineServerConfig";
import { InformationComponentType } from "../models/types/informationComponentType";

/**
 * Initialise the information component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseInformationComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: InformationComponentConfig
): Promise<{ instanceType?: string; factory?: typeof ComponentFactory; component?: IComponent }> {
	let component: IInformationComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === InformationComponentType.Service) {
		component = new InformationService(instanceConfig.options);
		instanceType = nameofKebabCase(InformationService);
	} else if (instanceConfig.type === InformationComponentType.RestClient) {
		component = new InformationClient(instanceConfig.options);
		instanceType = nameofKebabCase(InformationClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
