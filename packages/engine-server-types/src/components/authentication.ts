// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { EntityStorageAuthenticationRestClient } from "@3sixty/api-auth-entity-storage-rest-client";
import {
	EntityStorageAuthenticationService,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationAuthorizationCode,
	type AuthenticationPasswordReset,
	type AuthenticationUser
} from "@3sixty/api-auth-entity-storage-service";
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import { ComponentFactory, type IComponent } from "@3sixty/core";
import type {
	IEngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper, initialiseEntityStorageConnector } from "@3sixty/engine-types";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import type { AuthenticationComponentConfig } from "../models/config/authenticationComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { AuthenticationComponentType } from "../models/types/authenticationComponentType.js";

/**
 * Initialise the entity storage of the authentication users, shared by every component that uses
 * it so the schema and partitions match.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param storageType The configured storage type.
 */
export function initialiseAuthenticationUserEntityStorage(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	storageType: string | undefined
): void {
	initSchemaAuthEntityStorage();
	initialiseEntityStorageConnector(
		engineCore,
		context,
		storageType,
		nameof<AuthenticationUser>(),
		ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
			ContextIdKeys.Node,
			ContextIdKeys.Tenant
		])
	);
}

/**
 * Initialise the entity storage of the password reset and sign up verification tokens, partitioned
 * like the accounts they belong to.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param storageType The configured storage type.
 */
export function initialiseAuthenticationPasswordResetEntityStorage(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	storageType: string | undefined
): void {
	initSchemaAuthEntityStorage();
	initialiseEntityStorageConnector(
		engineCore,
		context,
		storageType,
		nameof<AuthenticationPasswordReset>(),
		ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
			ContextIdKeys.Node,
			ContextIdKeys.Tenant
		])
	);
}

/**
 * Initialise the entity storage of the OAuth 2.0 authorization codes of password accounts,
 * partitioned like the accounts they belong to.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param storageType The configured storage type.
 */
export function initialiseAuthenticationAuthorizationCodeEntityStorage(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	storageType: string | undefined
): void {
	initSchemaAuthEntityStorage();
	initialiseEntityStorageConnector(
		engineCore,
		context,
		storageType,
		nameof<AuthenticationAuthorizationCode>(),
		ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
			ContextIdKeys.Node,
			ContextIdKeys.Tenant
		])
	);
}

/**
 * Initialise the authentication component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuthenticationComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationComponentConfig
): IEngineTypeInitialiserReturn<AuthenticationComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthenticationComponentType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialiseAuthenticationUserEntityStorage(
				engineCore,
				context,
				createConfig.options?.userEntityStorageType
			);
			initialiseAuthenticationPasswordResetEntityStorage(
				engineCore,
				context,
				createConfig.options?.passwordResetEntityStorageType
			);
			initialiseAuthenticationAuthorizationCodeEntityStorage(
				engineCore,
				context,
				createConfig.options?.authorizationCodeEntityStorageType
			);
			return new EntityStorageAuthenticationService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						tenantAdminComponentType:
							engineCore.getRegisteredInstanceTypeOptional("tenantAdminComponent"),
						authenticationAuditServiceType: engineCore.getRegisteredInstanceType(
							"authenticationAuditComponent"
						),
						authenticationRateServiceType: engineCore.getRegisteredInstanceType(
							"authenticationRateComponent"
						),
						authenticationAccountAdminComponentType: engineCore.getRegisteredInstanceType(
							"authenticationAccountAdminComponent"
						),
						authenticationAccountComponentType: engineCore.getRegisteredInstanceType(
							"authenticationAccountComponent"
						),
						authorizationComponentType:
							engineCore.getRegisteredInstanceType("authorizationComponent"),
						organizationRequestAdminComponentType: engineCore.getRegisteredInstanceType(
							"organizationRequestAdminComponent"
						),
						messagingComponentType: engineCore.getRegisteredInstanceType("messagingComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(EntityStorageAuthenticationService)
						),
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationService);
	} else if (instanceConfig.type === AuthenticationComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new EntityStorageAuthenticationRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
