// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ComponentFactory, GeneralError, I18n, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof } from "@twin.org/nameof";
import type { ISynchronisedStorageComponent } from "@twin.org/synchronised-storage-models";
import { SynchronisedStorageClient } from "@twin.org/synchronised-storage-rest-client";
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
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 * @throws GeneralError if the component type is unknown.
 */
export async function initialiseSynchronisedStorageComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: SynchronisedStorageComponentConfig,
	overrideInstanceType?: string
): Promise<string | undefined> {
	engineCore.logInfo(
		I18n.formatMessage("engineCore.configuring", {
			element: `Synchronised Storage Component: ${instanceConfig.type}`
		})
	);

	const type = instanceConfig.type;
	let component: ISynchronisedStorageComponent;
	let instanceType: string;

	if (type === SynchronisedStorageComponentType.Service) {
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
			identityConnectorType: engineCore.getRegisteredInstanceType("identityConnector"),
			taskSchedulerComponentType: engineCore.getRegisteredInstanceType("taskSchedulerComponent"),
			trustedSynchronisedStorageComponentType: engineCore.getRegisteredInstanceTypeOptional(
				"synchronisedStorageComponent",
				["trusted"]
			),
			blobStorageConnectorType: engineCore.getRegisteredInstanceType("blobStorageConnector", [
				"public"
			]),
			...instanceConfig.options
		});
		instanceType = StringHelper.kebabCase(nameof(SynchronisedStorageService));
	} else if (type === SynchronisedStorageComponentType.RestClient) {
		component = new SynchronisedStorageClient(instanceConfig.options);
		instanceType = StringHelper.kebabCase(nameof(SynchronisedStorageClient));
	} else {
		throw new GeneralError("engineCore", "componentUnknownType", {
			type,
			componentType: "SynchronisedStorageComponent"
		});
	}

	const finalInstanceType = overrideInstanceType ?? instanceType;
	context.componentInstances.push({
		instanceType: finalInstanceType,
		component
	});
	ComponentFactory.register(finalInstanceType, () => component);
	return finalInstanceType;
}
