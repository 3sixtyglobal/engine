// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { EntityStorageAuthenticationAccountAdminRestClient } from "@3sixty/api-auth-account-rest-client";
import { EntityStorageAuthenticationAccountAdminService } from "@3sixty/api-auth-account-service";
import { ComponentFactory, type IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper } from "@3sixty/engine-types";
import { nameofKebabCase } from "@3sixty/nameof";
import {
	initialiseAccountDataEntityStorage,
	initialiseOrganizationEntityStorage,
	initialiseOrganizationRequestEntityStorage
} from "./authenticationAccount.js";
import type { AuthenticationAccountAdminComponentConfig } from "../models/config/authenticationAccountAdminComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { AuthenticationAccountAdminComponentType } from "../models/types/authenticationAccountAdminComponentType.js";

/**
 * Initialise the authentication account admin component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuthenticationAccountAdminComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationAccountAdminComponentConfig
): EngineTypeInitialiserReturn<AuthenticationAccountAdminComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthenticationAccountAdminComponentType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialiseAccountDataEntityStorage(
				engineCore,
				context,
				createConfig.options?.accountDataEntityStorageType
			);
			initialiseOrganizationEntityStorage(
				engineCore,
				context,
				createConfig.options?.organizationEntityStorageType
			);
			// Removing an identity removes its pending requests, and an identity import completes them.
			initialiseOrganizationRequestEntityStorage(
				engineCore,
				context,
				createConfig.options?.organizationRequestEntityStorageType
			);
			return new EntityStorageAuthenticationAccountAdminService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						authorizationComponentType:
							engineCore.getRegisteredInstanceTypeOptional("authorizationComponent"),
						identityComponentType: engineCore.getRegisteredInstanceTypeOptional("identityComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationAccountAdminService);
	} else if (instanceConfig.type === AuthenticationAccountAdminComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new EntityStorageAuthenticationAccountAdminRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationAccountAdminRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
