// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	EntityStorageNotarizationConnector,
	initSchema,
	type Notarization
} from "@twin.org/notarization-connector-entity-storage";
import { IotaNotarizationConnector } from "@twin.org/notarization-connector-iota";
import { NotarizationConnectorFactory } from "@twin.org/notarization-models";
import { NotarizationRestClient } from "@twin.org/notarization-rest-client";
import { NotarizationService } from "@twin.org/notarization-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { NotarizationComponentConfig } from "../models/config/notarizationComponentConfig.js";
import type { NotarizationConnectorConfig } from "../models/config/notarizationConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { NotarizationComponentType } from "../models/types/notarizationComponentType.js";
import { NotarizationConnectorType } from "../models/types/notarizationConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the notarization connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseNotarizationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: NotarizationConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof NotarizationConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === NotarizationConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchema();
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.notarizationEntityStorageType,
				nameof<Notarization>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);

			return new EntityStorageNotarizationConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		};
		instanceTypeName = EntityStorageNotarizationConnector.NAMESPACE;
	} else if (instanceConfig.type === NotarizationConnectorType.Iota) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
				engineCore.getConfig(),
				"dltConfig",
				DltConfigType.Iota
			);
			return new IotaNotarizationConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(IotaNotarizationConnector)
						),
						config: dltConfig?.options?.config
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = IotaNotarizationConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: NotarizationConnectorFactory
	};
}

/**
 * Initialise the notarization component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseNotarizationComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: NotarizationComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === NotarizationComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new NotarizationService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(NotarizationService)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(NotarizationService);
	} else if (instanceConfig.type === NotarizationComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new NotarizationRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(NotarizationRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
