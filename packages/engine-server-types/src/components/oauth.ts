// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { OAuthService } from "@3sixty/api-auth-oauth-service";
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { EngineTypeHelper } from "@3sixty/engine-types";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import type { OAuthComponentConfig } from "../models/config/oauthComponentConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { OAuthComponentType } from "../models/types/oauthComponentType.js";

/**
 * Initialise the OAuth sign in component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseOAuthComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: OAuthComponentConfig
): EngineTypeInitialiserReturn<OAuthComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === OAuthComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new OAuthService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						authenticationComponentType:
							engineCore.getRegisteredInstanceType("authenticationComponent"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(OAuthService)
						),
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						config: createConfig.options.config
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(OAuthService);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
