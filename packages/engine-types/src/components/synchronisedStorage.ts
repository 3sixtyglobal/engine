// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { ISynchronisedStorageComponent } from "@twin.org/synchronised-storage-models";
import { SynchronisedStorageRestClient } from "@twin.org/synchronised-storage-rest-client";
import {
	type SyncSnapshotEntry,
	SynchronisedStorageService,
	initSchema as initSchemaSynchronisedStorage
} from "@twin.org/synchronised-storage-service";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { SynchronisedStorageComponentConfig } from "../models/config/synchronisedStorageComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { SynchronisedStorageComponentType } from "../models/types/synchronisedStorageComponentType";

/**
 * Initialise the synchronised storage component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseSynchronisedStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: SynchronisedStorageComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: ISynchronisedStorageComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === SynchronisedStorageComponentType.Service) {
		initSchemaSynchronisedStorage();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.syncSnapshotStorageConnectorType,
			nameof<SyncSnapshotEntry>()
		);
		component = new SynchronisedStorageService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			eventBusComponentType: engineCore.getRegisteredInstanceType("eventBusComponent"),
			vaultConnectorType: engineCore.getRegisteredInstanceType("vaultConnector"),
			verifiableStorageConnectorType: engineCore.getRegisteredInstanceType(
				"verifiableStorageConnector"
			),
			taskSchedulerComponentType: engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
			policyEnforcementPointComponentType: engineCore.getRegisteredInstanceTypeOptional(
				"rightsManagementPepComponent"
			),
			trustedSynchronisedStorageComponentType: engineCore.getRegisteredInstanceTypeOptional(
				"synchronisedStorageComponent",
				["trusted"]
			),
			blobStorageConnectorType: engineCore.getRegisteredInstanceType("blobStorageConnector", [
				"public"
			]),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(SynchronisedStorageService);
	} else if (instanceConfig.type === SynchronisedStorageComponentType.RestClient) {
		component = new SynchronisedStorageRestClient({
			...instanceConfig.options,
			authenticationGeneratorType:
				instanceConfig.options?.authenticationGeneratorType ??
				engineCore.getRegisteredInstanceType("authenticationGeneratorComponent", [
					"verifiable-credential"
				])
		});
		instanceType = nameofKebabCase(SynchronisedStorageRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
