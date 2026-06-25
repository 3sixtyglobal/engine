// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory } from "@twin.org/core";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import {
	EntityStorageIdentityResolverConnector,
	initSchema as initSchemaIdentityStorage,
	type IdentityDocument
} from "@twin.org/identity-connector-entity-storage";
import { IotaIdentityResolverConnector } from "@twin.org/identity-connector-iota";
import { UniversalResolverConnector } from "@twin.org/identity-connector-universal";
import { IdentityResolverConnectorFactory } from "@twin.org/identity-models";
import { IdentityResolverRestClient } from "@twin.org/identity-rest-client";
import { IdentityResolverService } from "@twin.org/identity-service";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DltConfig } from "../models/config/dltConfig.js";
import type { IdentityResolverComponentConfig } from "../models/config/identityResolverComponentConfig.js";
import type { IdentityResolverConnectorConfig } from "../models/config/identityResolverConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DltConfigType } from "../models/types/dltConfigType.js";
import { IdentityResolverComponentType } from "../models/types/identityResolverComponentType.js";
import { IdentityResolverConnectorType } from "../models/types/identityResolverConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the identity resolver connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseIdentityResolverConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityResolverConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof IdentityResolverConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === IdentityResolverConnectorType.Iota) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const dltConfig = EngineTypeHelper.getConfigOfType<DltConfig>(
				engineCore.getConfig(),
				"dltConfig",
				DltConfigType.Iota
			);
			return new IotaIdentityResolverConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						config: dltConfig?.options?.config
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = IotaIdentityResolverConnector.NAMESPACE;
	} else if (instanceConfig.type === IdentityResolverConnectorType.EntityStorage) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaIdentityStorage({ includeProfile: false });
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.didDocumentEntityStorageType,
				nameof<IdentityDocument>(),
				[]
			);
			return new EntityStorageIdentityResolverConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{ vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector") },
					createConfig.options
				)
			);
		};
		instanceTypeName = EntityStorageIdentityResolverConnector.NAMESPACE;
	} else if (instanceConfig.type === IdentityResolverConnectorType.Universal) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new UniversalResolverConnector(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = UniversalResolverConnector.NAMESPACE;
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: IdentityResolverConnectorFactory
	};
}

/**
 * Initialise the identity resolver component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseIdentityResolverComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: IdentityResolverComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === IdentityResolverComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			const defaultIdentityResolverType = engineCore.getRegisteredInstanceType(
				"identityResolverConnector"
			);

			return new IdentityResolverService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						fallbackResolverConnectorType:
							defaultIdentityResolverType !== IdentityResolverConnectorType.Universal
								? IdentityResolverConnectorType.Universal
								: undefined
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(IdentityResolverService);
	} else if (instanceConfig.type === IdentityResolverComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new IdentityResolverRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(IdentityResolverRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
