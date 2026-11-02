// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { EntityStorageAuthenticationProviderConnector } from "@3sixty/api-auth-connector-entity-storage";
import { AuthenticationProviderFactory } from "@3sixty/api-auth-models";
import { GoogleOAuthProviderConnector } from "@3sixty/api-auth-oauth-connector-google";
import { MicrosoftOAuthProviderConnector } from "@3sixty/api-auth-oauth-connector-microsoft";
import type { IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper } from "@3sixty/engine-types";
import { initialiseAuthenticationUserEntityStorage } from "./authentication.js";
import type { AuthenticationProviderConfig } from "../models/config/authenticationProviderConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { AuthenticationProviderType } from "../models/types/authenticationProviderType.js";

/**
 * Initialise an authentication provider, registered under its authentication provider id.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuthenticationProvider(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: AuthenticationProviderConfig
): EngineTypeInitialiserReturn<AuthenticationProviderConfig, typeof AuthenticationProviderFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuthenticationProviderType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialiseAuthenticationUserEntityStorage(
				engineCore,
				context,
				createConfig.options?.userEntityStorageType
			);
			return new EntityStorageAuthenticationProviderConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageAuthenticationProviderConnector.NAMESPACE;
	} else if (instanceConfig.type === AuthenticationProviderType.Google) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new GoogleOAuthProviderConnector(createConfig.options);
		instanceTypeName = GoogleOAuthProviderConnector.NAMESPACE;
	} else if (instanceConfig.type === AuthenticationProviderType.Microsoft) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new MicrosoftOAuthProviderConnector(createConfig.options);
		instanceTypeName = MicrosoftOAuthProviderConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: AuthenticationProviderFactory
	};
}
