// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { OrganizationRestClient } from "@3sixty/api-auth-account-rest-client";
import { EntityStorageOrganizationService } from "@3sixty/api-auth-account-service";
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
import type { OrganizationComponentConfig } from "../models/config/organizationComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { OrganizationComponentType } from "../models/types/organizationComponentType.js";

/**
 * Initialise the organization component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseOrganizationComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: OrganizationComponentConfig
): EngineTypeInitialiserReturn<OrganizationComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === OrganizationComponentType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialiseOrganizationEntityStorage(
				engineCore,
				context,
				createConfig.options?.organizationEntityStorageType
			);
			initialiseAccountDataEntityStorage(
				engineCore,
				context,
				createConfig.options?.accountDataEntityStorageType
			);
			// The pending requests to join an organization are rejected when it is removed.
			initialiseOrganizationRequestEntityStorage(
				engineCore,
				context,
				createConfig.options?.organizationRequestEntityStorageType
			);
			return new EntityStorageOrganizationService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						identityComponentType: engineCore.getRegisteredInstanceType("identityComponent"),
						authorizationComponentType:
							engineCore.getRegisteredInstanceType("authorizationComponent"),
						authenticationRateServiceType: engineCore.getRegisteredInstanceType(
							"authenticationRateComponent"
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(EntityStorageOrganizationService);
	} else if (instanceConfig.type === OrganizationComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new OrganizationRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(OrganizationRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
