// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	type Tenant,
	TenantAdminService,
	initSchema as initSchemaTenant
} from "@twin.org/api-tenant-processor";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { TenantAdminComponentConfig } from "../models/config/tenantAdminComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TenantAdminComponentType } from "../models/types/tenantAdminComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the tenant admin component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTenantAdminComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TenantAdminComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TenantAdminComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaTenant();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.tenantEntityStorageType,
				nameof<Tenant>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
			);
			return new TenantAdminService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(TenantAdminService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
