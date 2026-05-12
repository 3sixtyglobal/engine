// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { JwtVerifiableCredentialGenerator } from "@twin.org/trust-generators";
import { TrustGeneratorFactory } from "@twin.org/trust-models";
import type { TrustGeneratorComponentConfig } from "../models/config/trustGeneratorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TrustGeneratorComponentType } from "../models/types/trustGeneratorComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the trust generator component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseTrustGeneratorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TrustGeneratorComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof TrustGeneratorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === TrustGeneratorComponentType.JwtVerifiableCredential) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new JwtVerifiableCredentialGenerator(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
						identityComponentType: engineCore.getRegisteredInstanceType("identityComponent")
					},
					createConfig.options
				)
			);
		instanceTypeName = nameofKebabCase(JwtVerifiableCredentialGenerator);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: TrustGeneratorFactory
	};
}
