// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { TrustVerifierFactory } from "@twin.org/trust-models";
import { JwtVerifiableCredentialVerifier } from "@twin.org/trust-verifiers";
import type { TrustVerifierComponentConfig } from "../models/config/trustVerifierComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TrustVerifierComponentType } from "../models/types/trustVerifierComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the trust verifier component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTrustVerifierComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TrustVerifierComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof TrustVerifierFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TrustVerifierComponentType.JwtVerifiableCredential) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new JwtVerifiableCredentialVerifier(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
						identityComponentType: engineCore.getRegisteredInstanceType("identityComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(JwtVerifiableCredentialVerifier);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: TrustVerifierFactory
	};
}
