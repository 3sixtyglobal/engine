// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { EntityStorageAuthenticationAccountRestClient } from "@3sixty/api-auth-account-rest-client";
import {
	type AccountData,
	EntityStorageAuthenticationAccountService,
	initSchema as initSchemaAuthAccount,
	type Organization,
	type OrganizationRequest
} from "@3sixty/api-auth-account-service";
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import { ComponentFactory, type IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper, initialiseEntityStorageConnector } from "@3sixty/engine-types";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import type { AuthenticationAccountComponentConfig } from "../models/config/authenticationAccountComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { AuthenticationAccountComponentType } from "../models/types/authenticationAccountComponentType.js";

/**
 * Initialise the entity storage of the account data, shared by every component that uses it so the
 * schema and partitions match.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param storageType The configured storage type.
 */
export function initialiseAccountDataEntityStorage(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	storageType: string | undefined
): void {
	initSchemaAuthAccount();
	initialiseEntityStorageConnector(
		engineCore,
		context,
		storageType,
		nameof<AccountData>(),
		ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
			ContextIdKeys.Node,
			ContextIdKeys.Tenant
		])
	);
}

/**
 * Initialise the entity storage of the requests to join an organization, shared by every component
 * that uses it so the schema and partitions match.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param storageType The configured storage type.
 */
export function initialiseOrganizationRequestEntityStorage(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	storageType: string | undefined
): void {
	initSchemaAuthAccount();
	initialiseEntityStorageConnector(
		engineCore,
		context,
		storageType,
		nameof<OrganizationRequest>(),
		ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
			ContextIdKeys.Node,
			ContextIdKeys.Tenant
		])
	);
}

/**
 * Initialise the entity storage of the registered organizations, inside the tenant partition like
 * the accounts that join them. Every component that checks an organization is registered
 * initialises it, so the check never runs against missing storage.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param storageType The configured storage type.
 */
export function initialiseOrganizationEntityStorage(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	storageType: string | undefined
): void {
	initSchemaAuthAccount();
	initialiseEntityStorageConnector(
		engineCore,
		context,
		storageType,
		nameof<Organization>(),
		ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
			ContextIdKeys.Node,
			ContextIdKeys.Tenant
		])
	);
}

/**
 * Initialise the authentication account component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuthenticationAccountComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationAccountComponentConfig
): EngineTypeInitialiserReturn<AuthenticationAccountComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthenticationAccountComponentType.EntityStorage) {
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
			return new EntityStorageAuthenticationAccountService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						identityComponentType:
							engineCore.getRegisteredInstanceTypeOptional("identityComponent"),
						authenticationRateServiceType: engineCore.getRegisteredInstanceTypeOptional(
							"authenticationRateComponent"
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationAccountService);
	} else if (instanceConfig.type === AuthenticationAccountComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new EntityStorageAuthenticationAccountRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationAccountRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
