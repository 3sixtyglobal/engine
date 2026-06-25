// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	EntityStorageAuthenticationAuditService,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationAuditEntry
} from "@twin.org/api-auth-entity-storage-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { EngineTypeHelper, initialiseEntityStorageConnector } from "@twin.org/engine-types";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { AuthenticationAuditComponentConfig } from "../models/config/authenticationAuditComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { AuthenticationAuditComponentType } from "../models/types/authenticationAuditComponentType.js";

/**
 * Initialise the authentication audit.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuthenticationAuditComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationAuditComponentConfig
): EngineTypeInitialiserReturn<AuthenticationAuditComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthenticationAuditComponentType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaAuthEntityStorage();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.authenticationAuditEntryStorageType,
				nameof<AuthenticationAuditEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageAuthenticationAuditService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = nameofKebabCase(EntityStorageAuthenticationAuditService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
