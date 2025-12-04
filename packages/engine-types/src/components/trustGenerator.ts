// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { JwtVerifiableCredentialGenerator } from "@twin.org/trust-generators";
import { type ITrustGenerator, TrustGeneratorFactory } from "@twin.org/trust-models";
import type { TrustGeneratorComponentConfig } from "../models/config/trustGeneratorComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TrustGeneratorComponentType } from "../models/types/trustGeneratorComponentType.js";

/**
 * Initialise the trust generator component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseTrustGeneratorComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TrustGeneratorComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof TrustGeneratorFactory;
	component?: IComponent;
}> {
	let component: ITrustGenerator | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === TrustGeneratorComponentType.JwtVerifiableCredential) {
		component = new JwtVerifiableCredentialGenerator({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			identityComponentType: engineCore.getRegisteredInstanceType("identityComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(JwtVerifiableCredentialGenerator);
	}

	return {
		component,
		instanceType,
		factory: TrustGeneratorFactory
	};
}
