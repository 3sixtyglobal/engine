// Copyright 2025 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import { DataspaceControlPlaneRestClient } from "@twin.org/dataspace-control-plane-rest-client";
import {
	DataspaceControlPlaneService,
	initSchema as initSchemaDataspaceControlPlane
} from "@twin.org/dataspace-control-plane-service";
import type { DataspaceAppDataset, TransferProcess } from "@twin.org/dataspace-models";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { DataspaceControlPlaneComponentConfig } from "../models/config/dataspaceControlPlaneComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { DataspaceControlPlaneComponentType } from "../models/types/dataspaceControlPlaneComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the dataspace control plane component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseDataspaceControlPlaneComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: DataspaceControlPlaneComponentConfig
): EngineTypeInitialiserReturn<DataspaceControlPlaneComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === DataspaceControlPlaneComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialiseDataspaceSharedEntityStorages(
				engineCore,
				context,
				instanceConfig.options?.transferProcessEntityStorageType,
				instanceConfig.options?.dataspaceAppDatasetEntityStorageType
			);

			return new DataspaceControlPlaneService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredInstanceTypeOptional("loggingComponent"),
						trustComponentType: engineCore.getRegisteredInstanceTypeOptional("trustComponent"),
						policyAdministrationPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPapComponent"
						),
						policyNegotiationPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPnpComponent"
						),
						policyNegotiationAdminPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPnapComponent"
						),
						federatedCatalogueComponentType: engineCore.getRegisteredInstanceType(
							"federatedCatalogueComponent"
						),
						identityComponentType:
							engineCore.getRegisteredInstanceTypeOptional("identityComponent"),
						identityAuthenticationComponentType: engineCore.getRegisteredInstanceTypeOptional(
							"identityAuthenticationComponent"
						),
						taskSchedulerComponentType:
							engineCore.getRegisteredInstanceTypeOptional("taskSchedulerComponent"),
						dataPlaneComponentType: engineCore.getRegisteredInstanceType(
							"dataspaceDataPlaneComponent"
						),
						platformComponentType: engineCore.getRegisteredInstanceType("platformComponent"),
						telemetryComponentType:
							engineCore.getRegisteredInstanceTypeOptional("telemetryComponent")
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(DataspaceControlPlaneService);
	} else if (instanceConfig.type === DataspaceControlPlaneComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new DataspaceControlPlaneRestClient(createConfig.options);
		instanceTypeName = nameofKebabCase(DataspaceControlPlaneRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}

/**
 * Initialise the shared entity storages used by both control and data plane services.
 * Both planes must register the same connector name with the same partition keys,
 * otherwise initialiseEntityStorageConnector silently drops the second registration
 * and the two layers disagree on where records live.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param transferProcessEntityStorageType The entity storage type for transfer processes.
 * @param dataspaceAppDatasetEntityStorageType The entity storage type for dataspace app datasets.
 */
export function initialiseDataspaceSharedEntityStorages(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	transferProcessEntityStorageType: string | undefined,
	dataspaceAppDatasetEntityStorageType: string | undefined
): void {
	initSchemaDataspaceControlPlane();

	const partitionContextIds = ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
		ContextIdKeys.Node,
		ContextIdKeys.Tenant
	]);

	initialiseEntityStorageConnector(
		engineCore,
		context,
		transferProcessEntityStorageType,
		nameof<TransferProcess>(),
		partitionContextIds
	);

	initialiseEntityStorageConnector(
		engineCore,
		context,
		dataspaceAppDatasetEntityStorageType,
		nameof<DataspaceAppDataset>(),
		partitionContextIds
	);
}