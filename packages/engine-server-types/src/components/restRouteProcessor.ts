// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuthHeaderProcessor } from "@twin.org/api-auth-entity-storage-service";
import { RestRouteProcessorFactory, type IBaseRouteProcessor } from "@twin.org/api-models";
import {
	LoggingProcessor,
	ContextIdProcessor,
	RestRouteProcessor,
	StaticContextIdProcessor
} from "@twin.org/api-processors";
import {
	initSchema as initSchemaTenantProcessor,
	type Tenant,
	TenantProcessor
} from "@twin.org/api-tenant-processor";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { initialiseEntityStorageConnector } from "@twin.org/engine-types";
import { VerifiableCredentialAuthenticationProcessor } from "@twin.org/identity-authentication";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { RestRouteProcessorConfig } from "../models/config/restRouteProcessorConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { RestRouteProcessorType } from "../models/types/restRouteProcessorType.js";

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
	} else if (instanceConfig.type === RestRouteProcessorType.ContextId) {
		component = new ContextIdProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(ContextIdProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.StaticContextId) {
		component = new StaticContextIdProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(StaticContextIdProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.RestRoute) {
		component = new RestRouteProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(RestRouteProcessor);
	} else if (instanceConfig.type === RestRouteProcessorType.Tenant) {
		initSchemaTenantProcessor();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.tenantEntityStorageType,
			nameof<Tenant>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);

		component = new TenantProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(TenantProcessor);
	}

	return {
		component,
		instanceType,
		factory: RestRouteProcessorFactory
	};
}
