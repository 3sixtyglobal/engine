// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { IImmutableProofComponent } from "@twin.org/immutable-proof-models";
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

/**
 * Initialise the immutable proof component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseImmutableProofComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ImmutableProofComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IImmutableProofComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === ImmutableProofComponentType.Service) {
		initSchemaImmutableProof();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.immutableProofEntityStorageType,
			nameof<ImmutableProof>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);

		component = new ImmutableProofService({
			verifiableStorageType: engineCore.getRegisteredInstanceType("verifiableStorageConnector"),
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			backgroundTaskConnectorType: engineCore.getRegisteredInstanceType("backgroundTaskConnector"),
			eventBusComponentType: engineCore.getRegisteredInstanceTypeOptional("eventBusComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(ImmutableProofService);
	} else if (instanceConfig.type === ImmutableProofComponentType.RestClient) {
		component = new ImmutableProofRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(ImmutableProofRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
