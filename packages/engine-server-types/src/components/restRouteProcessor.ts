// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuthHeaderProcessor } from "@twin.org/api-auth-entity-storage-service";
import { RestRouteProcessorFactory, type IBaseRouteProcessor } from "@twin.org/api-models";
import {
	LoggingProcessor,
	NodeIdentityProcessor,
	RestRouteProcessor,
	StaticUserIdentityProcessor
} from "@twin.org/api-processors";
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { VerifiableCredentialAuthenticationProcessor } from "@twin.org/identity-authentication";
import { nameofKebabCase } from "@twin.org/nameof";
import type { RestRouteProcessorConfig } from "../models/config/restRouteProcessorConfig";
import type { IEngineServerConfig } from "../models/IEngineServerConfig";
import { RestRouteProcessorType } from "../models/types/restRouteProcessorType";

/**
 * Initialise the rest route processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRestRouteProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: RestRouteProcessorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof RestRouteProcessorFactory;
	component?: IComponent;
}> {
	let component: IBaseRouteProcessor | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RestRouteProcessorType.AuthHeader) {
		component = new AuthHeaderProcessor({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(AuthHeaderProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.AuthVerifiableCredential) {
		component = new VerifiableCredentialAuthenticationProcessor({
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(VerifiableCredentialAuthenticationProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.Logging) {
		component = new LoggingProcessor({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(LoggingProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.NodeIdentity) {
		component = new NodeIdentityProcessor();
		instanceType = nameofKebabCase(NodeIdentityProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.StaticUserIdentity) {
		component = new StaticUserIdentityProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(StaticUserIdentityProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.RestRoute) {
		component = new RestRouteProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(RestRouteProcessor);
	}
	return {
		component,
		instanceType,
		factory: RestRouteProcessorFactory
	};
}
