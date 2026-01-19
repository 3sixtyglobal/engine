// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuthHeaderProcessor } from "@twin.org/api-auth-entity-storage-service";
import { SocketRouteProcessorFactory, type IBaseRouteProcessor } from "@twin.org/api-models";
import {
	LoggingProcessor,
	ContextIdProcessor,
	SocketRouteProcessor,
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
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { SocketRouteProcessorConfig } from "../models/config/socketRouteProcessorConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { SocketRouteProcessorType } from "../models/types/socketRouteProcessorType.js";

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
	} else if (instanceConfig.type === SocketRouteProcessorType.Logging) {
		component = new LoggingProcessor({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			config: {
				...instanceConfig.options?.config
			}
		});
		instanceType = nameofKebabCase(LoggingProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.ContextId) {
		component = new ContextIdProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(ContextIdProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.StaticContextId) {
		component = new StaticContextIdProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(StaticContextIdProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.SocketRoute) {
		component = new SocketRouteProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(SocketRouteProcessor);
	} else if (instanceConfig.type === SocketRouteProcessorType.Tenant) {
		initSchemaTenantProcessor();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.tenantEntityStorageType,
			nameof<Tenant>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [ContextIdKeys.Node])
		);

		component = new TenantProcessor(instanceConfig.options);
		instanceType = nameofKebabCase(TenantProcessor);
	}

	return {
		component,
		instanceType,
		factory: SocketRouteProcessorFactory
	};
}
