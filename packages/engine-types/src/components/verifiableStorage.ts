// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import type { IComponent } from "@twin.org/core";
import { ComponentFactory } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageVerifiableStorageConnector,
	initSchema as initSchemaVerifiableStorageStorage,
	type VerifiableItem
} from "@twin.org/verifiable-storage-connector-entity-storage";
import { IotaVerifiableStorageConnector } from "@twin.org/verifiable-storage-connector-iota";
import { VerifiableStorageConnectorFactory } from "@twin.org/verifiable-storage-models";
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
export function initialiseVerifiableStorageConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VerifiableStorageConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof VerifiableStorageConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === VerifiableStorageConnectorType.Iota) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
				engineCore.getConfig(),
				"dltConfig",
				DltConfigType.Iota
			);
			return new IotaVerifiableStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						loggingComponentType: engineCore.getRegisteredInstanceTypeOptional("loggingComponent"),
						config: dltConfig?.options?.config
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = IotaVerifiableStorageConnector.NAMESPACE;
	} else if (instanceConfig.type === VerifiableStorageConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaVerifiableStorageStorage();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.verifiableStorageEntityStorageType,
				nameof<VerifiableItem>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new EntityStorageVerifiableStorageConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageVerifiableStorageConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
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
export function initialiseVerifiableStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: VerifiableStorageComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === VerifiableStorageComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new VerifiableStorageService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(VerifiableStorageService);
	} else if (instanceConfig.type === VerifiableStorageComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new VerifiableStorageRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(VerifiableStorageRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
