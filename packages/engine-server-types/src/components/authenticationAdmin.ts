// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { EntityStorageAuthenticationAdminService } from "@3sixty/api-auth-entity-storage-service";
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper } from "@3sixty/engine-types";
import { nameofKebabCase } from "@3sixty/nameof";
import {
	initialiseAuthenticationPasswordResetEntityStorage,
	initialiseAuthenticationUserEntityStorage
} from "./authentication.js";
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
			initialiseAuthenticationUserEntityStorage(
				engineCore,
				context,
				createConfig.options?.userEntityStorageType
			);
			// The password reset tokens of a removed account are removed with it.
			initialiseAuthenticationPasswordResetEntityStorage(
				engineCore,
				context,
				createConfig.options?.passwordResetEntityStorageType
			);
			return new EntityStorageAuthenticationAdminService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						authenticationAuditServiceType: engineCore.getRegisteredInstanceType(
							"authenticationAuditComponent"
						),
						authenticationAccountAdminComponentType: engineCore.getRegisteredInstanceType(
							"authenticationAccountAdminComponent"
						),
						organizationRequestAdminComponentType: engineCore.getRegisteredInstanceType(
							"organizationRequestAdminComponent"
						),
						authorizationComponentType:
							engineCore.getRegisteredInstanceType("authorizationComponent")
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
