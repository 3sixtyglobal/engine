// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthenticationAdminComponent } from "@twin.org/api-auth-entity-storage-models";
import {
	EntityStorageAuthenticationAdminService,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@twin.org/api-auth-entity-storage-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { initialiseEntityStorageConnector } from "@twin.org/engine-types";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { AuthenticationAdminComponentConfig } from "../models/config/authenticationAdminComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { AuthenticationAdminComponentType } from "../models/types/authenticationAdminComponentType.js";

/**
 * Initialise the authentication admin.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseAuthenticationAdminComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationAdminComponentConfig
): Promise<{ instanceType?: string; factory?: typeof ComponentFactory; component?: IComponent }> {
	let component: IAuthenticationAdminComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === AuthenticationAdminComponentType.EntityStorage) {
		initSchemaAuthEntityStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.userEntityStorageType,
			nameof<AuthenticationUser>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);

		component = new EntityStorageAuthenticationAdminService({
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(EntityStorageAuthenticationAdminService);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
