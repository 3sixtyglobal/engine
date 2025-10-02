// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuthHeaderProcessor } from "@twin.org/api-auth-entity-storage-service";
import { SocketRouteProcessorFactory, type IBaseRouteProcessor } from "@twin.org/api-models";
import {
	LoggingProcessor,
	NodeIdentityProcessor,
	SocketRouteProcessor,
	StaticUserIdentityProcessor
} from "@twin.org/api-processors";
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { VerifiableCredentialAuthenticationProcessor } from "@twin.org/identity-authentication";
import { nameofKebabCase } from "@twin.org/nameof";
import type { SocketRouteProcessorConfig } from "../models/config/socketRouteProcessorConfig";
import type { IEngineServerConfig } from "../models/IEngineServerConfig";
import { SocketRouteProcessorType } from "../models/types/socketRouteProcessorType";

/**
 * Initialise the socket route processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseSocketRouteProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: SocketRouteProcessorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof SocketRouteProcessorFactory;
	component?: IComponent;
}> {
	let component: IBaseRouteProcessor | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === SocketRouteProcessorType.AuthHeader) {
		component = new AuthHeaderProcessor({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(AuthHeaderProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.AuthVerifiableCredential) {
		component = new VerifiableCredentialAuthenticationProcessor({
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(VerifiableCredentialAuthenticationProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.Logging) {
		component = new LoggingProcessor({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(LoggingProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.NodeIdentity) {
		component = new NodeIdentityProcessor();
		instanceType = nameofKebabCase(NodeIdentityProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.StaticUserIdentity) {
		component = new StaticUserIdentityProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(StaticUserIdentityProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.SocketRoute) {
		component = new SocketRouteProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(SocketRouteProcessor);
	}

	return {
		component,
		instanceType,
		factory: SocketRouteProcessorFactory
	};
}
