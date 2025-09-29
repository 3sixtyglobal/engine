// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AuthenticationGeneratorFactory,
	type IAuthenticationGenerator
} from "@twin.org/api-models";
import { GeneralError, I18n } from "@twin.org/core";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseAuthenticationGeneratorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuthenticationGeneratorComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Authentication Generator Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: IAuthenticationGenerator;
	let instanceType: string;

	if (type === AuthenticationGeneratorComponentType.VerifiableCredential) {
		component = new VerifiableCredentialAuthenticationGenerator({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(VerifiableCredentialAuthenticationGenerator);
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "AuthenticationGeneratorComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	AuthenticationGeneratorFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
