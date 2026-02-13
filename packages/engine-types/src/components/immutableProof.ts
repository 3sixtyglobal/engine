// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { ImmutableProofRestClient } from "@twin.org/immutable-proof-rest-client";
import {
	type ImmutableProof,
	ImmutableProofService,
	initSchema as initSchemaImmutableProof
} from "@twin.org/immutable-proof-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { ImmutableProofComponentConfig } from "../models/config/immutableProofComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { ImmutableProofComponentType } from "../models/types/immutableProofComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the immutable proof component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseImmutableProofComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ImmutableProofComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === ImmutableProofComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaImmutableProof();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.immutableProofEntityStorageType,
				nameof<ImmutableProof>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new ImmutableProofService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						verifiableStorageType: engineCore.getRegisteredInstanceType(
							"verifiableStorageConnector"
						),
						identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
						backgroundTaskComponentType:
							engineCore.getRegisteredInstanceType("backgroundTaskComponent"),
						eventBusComponentType: engineCore.getRegisteredInstanceTypeOptional("eventBusComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(ImmutableProofService);
	} else if (instanceConfig.type === ImmutableProofComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new ImmutableProofRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(ImmutableProofRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
