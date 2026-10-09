// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	EntityStorageAuthenticationAdminService,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@3sixty/api-auth-entity-storage-service";
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper, initialiseEntityStorageConnector } from "@3sixty/engine-types";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
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
export function initialiseAuthenticationAdminComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationAdminComponentConfig
): EngineTypeInitialiserReturn<AuthenticationAdminComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthenticationAdminComponentType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaAuthEntityStorage();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.userEntityStorageType,
				nameof<AuthenticationUser>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageAuthenticationAdminService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						authenticationAuditServiceType: engineCore.getRegisteredInstanceTypeOptional(
							"authenticationAuditComponent"
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationAdminService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
