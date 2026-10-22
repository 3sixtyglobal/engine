// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { CasbinAuthorizationConnector } from "@3sixty/authorization-connector-casbin";
import {
	EntityStorageAuthorizationConnector,
	initSchema,
	type AuthorizationPolicy,
	type AuthorizationRoleAssignment,
	type AuthorizationRoleInheritance,
	type AuthorizationRoleName
} from "@3sixty/authorization-connector-entity-storage";
import { AuthorizationConnectorFactory } from "@3sixty/authorization-models";
import { AuthorizationRestClient } from "@3sixty/authorization-rest-client";
import { AuthorizationService } from "@3sixty/authorization-service";
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import type { IComponent } from "@3sixty/core";
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { AuthorizationComponentConfig } from "../models/config/authorizationComponentConfig.js";
import type { AuthorizationConnectorConfig } from "../models/config/authorizationConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { AuthorizationComponentType } from "../models/types/authorizationComponentType.js";
import { AuthorizationConnectorType } from "../models/types/authorizationConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the authorization connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuthorizationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuthorizationConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof AuthorizationConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthorizationConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			const contextIds = ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			]);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.authorizationPolicyEntityStorageType,
				nameof<AuthorizationPolicy>(),
				contextIds
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.authorizationRoleAssignmentEntityStorageType,
				nameof<AuthorizationRoleAssignment>(),
				contextIds
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.authorizationRoleInheritanceEntityStorageType,
				nameof<AuthorizationRoleInheritance>(),
				contextIds
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.authorizationRoleNameEntityStorageType,
				nameof<AuthorizationRoleName>(),
				contextIds
			);
			return new EntityStorageAuthorizationConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageAuthorizationConnector.NAMESPACE;
	} else if (instanceConfig.type === AuthorizationConnectorType.Casbin) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new CasbinAuthorizationConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(CasbinAuthorizationConnector)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = CasbinAuthorizationConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: AuthorizationConnectorFactory
	};
}

/**
 * Initialise the authorization component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuthorizationComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuthorizationComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthorizationComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AuthorizationService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(AuthorizationService)
						),
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(AuthorizationService)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(AuthorizationService);
	} else if (instanceConfig.type === AuthorizationComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AuthorizationRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(AuthorizationRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
