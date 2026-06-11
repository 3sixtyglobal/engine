// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { PlatformService } from "@twin.org/api-service";
import { type Tenant, initSchema as initSchemaTenant } from "@twin.org/api-tenant-processor";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { PlatformComponentConfig } from "../models/config/platformComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { PlatformComponentType } from "../models/types/platformComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the platform component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialisePlatformComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: PlatformComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === PlatformComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaTenant();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.tenantEntityStorageType,
				nameof<Tenant>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
			);
			return new PlatformService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = nameofKebabCase(PlatformService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
