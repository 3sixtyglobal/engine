// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AuthenticationGeneratorFactory,
	type IAuthenticationGenerator
} from "@twin.org/api-models";
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { VerifiableCredentialAuthenticationGenerator } from "@twin.org/identity-authentication";
import { nameofKebabCase } from "@twin.org/nameof";
import type { AuthenticationGeneratorComponentConfig } from "../models/config/authenticationGeneratorComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { AuthenticationGeneratorComponentType } from "../models/types/authenticationGeneratorComponentType";

/**
 * Initialise the authentication generator component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseAuthenticationGeneratorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuthenticationGeneratorComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof AuthenticationGeneratorFactory;
	component?: IComponent;
}> {
	let component: IAuthenticationGenerator | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === AuthenticationGeneratorComponentType.VerifiableCredential) {
		component = new VerifiableCredentialAuthenticationGenerator({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(VerifiableCredentialAuthenticationGenerator);
	}

	return {
		component,
		instanceType,
		factory: AuthenticationGeneratorFactory
	};
}
