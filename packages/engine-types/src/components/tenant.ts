// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITenantAdminComponent } from "@twin.org/api-models";
import {
	type Tenant,
	TenantAdminService,
	initSchema as initSchemaTenant
} from "@twin.org/api-tenant-processor";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { TenantAdminComponentConfig } from "../models/config/tenantAdminComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TenantAdminComponentType } from "../models/types/tenantAdminComponentType.js";

/**
 * Initialise the tenant admin component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseTenantAdminComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TenantAdminComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: ITenantAdminComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === TenantAdminComponentType.Service) {
		initSchemaTenant();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.tenantEntityStorageType,
			nameof<Tenant>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
		);

		component = new TenantAdminService({
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(TenantAdminService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
