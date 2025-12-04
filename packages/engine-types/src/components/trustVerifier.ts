// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
import { type ITrustVerifier, TrustVerifierFactory } from "@twin.org/trust-models";
import { JwtVerifiableCredentialVerifier } from "@twin.org/trust-verifiers";
import type { TrustVerifierComponentConfig } from "../models/config/trustVerifierComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { TrustVerifierComponentType } from "../models/types/trustVerifierComponentType.js";

/**
 * Initialise the trust verifier component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseTrustVerifierComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: TrustVerifierComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof TrustVerifierFactory;
	component?: IComponent;
}> {
	let component: ITrustVerifier | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === TrustVerifierComponentType.JwtVerifiableCredential) {
		component = new JwtVerifiableCredentialVerifier({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			identityComponentType: engineCore.getRegisteredInstanceType("identityComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(JwtVerifiableCredentialVerifier);
	}

	return {
		component,
		instanceType,
		factory: TrustVerifierFactory
	};
}
