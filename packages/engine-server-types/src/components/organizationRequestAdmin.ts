// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { OrganizationRequestAdminRestClient } from "@3sixty/api-auth-account-rest-client";
import { EntityStorageOrganizationRequestAdminService } from "@3sixty/api-auth-account-service";
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
import type { OrganizationRequestAdminComponentConfig } from "../models/config/organizationRequestAdminComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { OrganizationRequestAdminComponentType } from "../models/types/organizationRequestAdminComponentType.js";

/**
 * Initialise the organization request admin component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseOrganizationRequestAdminComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: OrganizationRequestAdminComponentConfig
): EngineTypeInitialiserReturn<OrganizationRequestAdminComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === OrganizationRequestAdminComponentType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialiseAccountDataEntityStorage(
				engineCore,
				context,
				createConfig.options?.accountDataEntityStorageType
			);
			initialiseOrganizationRequestEntityStorage(
				engineCore,
				context,
				createConfig.options?.organizationRequestEntityStorageType
			);
			initialiseOrganizationEntityStorage(
				engineCore,
				context,
				createConfig.options?.organizationEntityStorageType
			);
			return new EntityStorageOrganizationRequestAdminService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						identityComponentType: engineCore.getRegisteredInstanceType("identityComponent"),
						authorizationComponentType:
							engineCore.getRegisteredInstanceType("authorizationComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(EntityStorageOrganizationRequestAdminService);
	} else if (instanceConfig.type === OrganizationRequestAdminComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new OrganizationRequestAdminRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(OrganizationRequestAdminRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
