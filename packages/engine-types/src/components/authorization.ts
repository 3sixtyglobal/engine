// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { CasbinAuthorizationConnector } from "@twin.org/authorization-connector-casbin";
import {
	EntityStorageAuthorizationConnector,
	initSchema,
	type AuthorizationPolicy,
	type AuthorizationRoleAssignment,
	type AuthorizationRoleInheritance,
	type AuthorizationRoleName
} from "@twin.org/authorization-connector-entity-storage";
import { AuthorizationConnectorFactory } from "@twin.org/authorization-models";
import { AuthorizationRestClient } from "@twin.org/authorization-rest-client";
import { AuthorizationService } from "@twin.org/authorization-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
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
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(
							nameof(EntityStorageAuthorizationConnector)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageAuthorizationConnector.NAMESPACE;
	} else if (instanceConfig.type === AuthorizationConnectorType.Casbin) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new CasbinAuthorizationConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredLoggerType(
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
						telemetryComponentType:
							engineCore.getRegisteredInstanceTypeOptional("telemetryComponent")
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
