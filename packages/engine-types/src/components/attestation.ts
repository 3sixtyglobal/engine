// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { NftAttestationConnector } from "@twin.org/attestation-connector-nft";
import {
	AttestationConnectorFactory,
	type IAttestationComponent,
	type IAttestationConnector
} from "@twin.org/attestation-models";
import { AttestationClient } from "@twin.org/attestation-rest-client";
import { AttestationService } from "@twin.org/attestation-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { AttestationComponentConfig } from "../models/config/attestationComponentConfig";
import type { AttestationConnectorConfig } from "../models/config/attestationConnectorConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { AttestationComponentType } from "../models/types/attestationComponentType";
import { AttestationConnectorType } from "../models/types/attestationConnectorType";

/**
 * Initialise the attestation connector.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseAttestationConnector(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AttestationConnectorConfig
): Promise<{
	instanceType?: string;
	factory?: typeof AttestationConnectorFactory;
	component?: IComponent;
}> {
	let component: IAttestationConnector | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === AttestationConnectorType.Nft) {
		component = new NftAttestationConnector({
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			nftConnectorType: engineCore.getRegisteredInstanceType("nftConnector"),
			...instanceConfig.options
		});
		instanceType = NftAttestationConnector.NAMESPACE;
	}

	return {
		component,
		instanceType,
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
export async function initialiseAttestationComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AttestationComponentConfig
): Promise<{ instanceType?: string; factory?: typeof ComponentFactory; component?: IComponent }> {
	let component: IAttestationComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === AttestationComponentType.Service) {
		component = new AttestationService({
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(AttestationService);
	} else if (instanceConfig.type === AttestationComponentType.RestClient) {
		component = new AttestationClient(instanceConfig.options);
		instanceType = nameofKebabCase(AttestationClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
