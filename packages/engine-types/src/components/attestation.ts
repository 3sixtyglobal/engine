// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { INftAttestationConnectorConstructorOptions } from "@twin.org/attestation-connector-nft";
import { NftAttestationConnector } from "@twin.org/attestation-connector-nft";
import { AttestationConnectorFactory } from "@twin.org/attestation-models";
import { AttestationRestClient } from "@twin.org/attestation-rest-client";
import { AttestationService } from "@twin.org/attestation-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { AttestationComponentConfig } from "../models/config/attestationComponentConfig.js";
import type { AttestationConnectorConfig } from "../models/config/attestationConnectorConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { AttestationComponentType } from "../models/types/attestationComponentType.js";
import { AttestationConnectorType } from "../models/types/attestationConnectorType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the attestation connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config type.
 * @returns The instance created and the factory for it.
 */
export function initialiseAttestationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AttestationConnectorConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof AttestationConnectorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AttestationConnectorType.Nft) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new NftAttestationConnector(
				EngineTypeHelper.mergeConfig<INftAttestationConnectorConstructorOptions>(
					{
						identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
						nftConnectorType: engineCore.getRegisteredInstanceType("nftConnector")
					},
					createConfig.options
				)
			);
		instanceTypeName = NftAttestationConnector.NAMESPACE;
	}

	return {
		createComponent,
		instanceTypeName,
		factory: AttestationConnectorFactory
	};
}

/**
 * Initialise the attestation component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAttestationComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AttestationComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AttestationComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AttestationService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(AttestationService)
						)
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(AttestationService);
	} else if (instanceConfig.type === AttestationComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AttestationRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(AttestationRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
