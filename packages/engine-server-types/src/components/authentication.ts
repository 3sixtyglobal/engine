// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthenticationComponent } from "@twin.org/api-auth-entity-storage-models";
import { EntityStorageAuthenticationRestClient } from "@twin.org/api-auth-entity-storage-rest-client";
import {
	EntityStorageAuthenticationService,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@twin.org/api-auth-entity-storage-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { initialiseEntityStorageConnector } from "@twin.org/engine-types";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { AuthenticationComponentConfig } from "../models/config/authenticationComponentConfig";
import type { IEngineServerConfig } from "../models/IEngineServerConfig";
import { AuthenticationComponentType } from "../models/types/authenticationComponentType";

/**
 * Initialise the authentication.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseAuthenticationComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationComponentConfig
): Promise<{ instanceType?: string; factory?: typeof ComponentFactory; component?: IComponent }> {
	let component: IAuthenticationComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === AuthenticationComponentType.EntityStorage) {
		initSchemaAuthEntityStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.userEntityStorageType,
			nameof<AuthenticationUser>()
		);

		component = new EntityStorageAuthenticationService({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			authenticationAdminServiceType: engineCore.getRegisteredInstanceType(
				"authenticationAdminComponent"
			),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(EntityStorageAuthenticationService);
	} else if (instanceConfig.type === AuthenticationComponentType.RestClient) {
		component = new EntityStorageAuthenticationRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(EntityStorageAuthenticationRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
