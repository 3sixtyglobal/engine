// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageVerifiableStorageConnector,
	initSchema as initSchemaVerifiableStorageStorage,
	type VerifiableItem
} from "@twin.org/verifiable-storage-connector-entity-storage";
import { IotaVerifiableStorageConnector } from "@twin.org/verifiable-storage-connector-iota";
import {
	VerifiableStorageConnectorFactory,
	type IVerifiableStorageComponent,
	type IVerifiableStorageConnector
} from "@twin.org/verifiable-storage-models";
import { VerifiableStorageRestClient } from "@twin.org/verifiable-storage-rest-client";
import { VerifiableStorageService } from "@twin.org/verifiable-storage-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { VerifiableStorageComponentConfig } from "../models/config/verifiableStorageComponentConfig.js";
import type { VerifiableStorageConnectorConfig } from "../models/config/verifiableStorageConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { VerifiableStorageComponentType } from "../models/types/verifiableStorageComponentType.js";
import { VerifiableStorageConnectorType } from "../models/types/verifiableStorageConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the verifiable storage connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseVerifiableStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VerifiableStorageConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof VerifiableStorageConnectorFactory;
	component?: IComponent;
}> {
	let component: IVerifiableStorageConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === VerifiableStorageConnectorType.Iota) {
		const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
			engineCore.getConfig(),
			"dltConfig",
			DltConfigType.Iota
		);
		component = new IotaVerifiableStorageConnector({
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			loggingComponentType: engineCore.getRegisteredInstanceTypeOptional("loggingComponent"),
			...instanceConfig.options,
			config: {
				...dltConfig?.options?.config,
				...instanceConfig.options.config
			}
		});
		instanceType = IotaVerifiableStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === VerifiableStorageConnectorType.EntityStorage) {
		initSchemaVerifiableStorageStorage();
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.verifiableStorageEntityStorageType,
			nameof<VerifiableItem>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		component = new EntityStorageVerifiableStorageConnector(instanceConfig.options);
		instanceType = EntityStorageVerifiableStorageConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
		factory: VerifiableStorageConnectorFactory
	};
}

/**
 * Initialise the verifiable storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseVerifiableStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VerifiableStorageComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IVerifiableStorageComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === VerifiableStorageComponentType.Service) {
		component = new VerifiableStorageService({
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(VerifiableStorageService);
	} else if (instanceConfig.type === VerifiableStorageComponentType.RestClient) {
		component = new VerifiableStorageRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(VerifiableStorageRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
