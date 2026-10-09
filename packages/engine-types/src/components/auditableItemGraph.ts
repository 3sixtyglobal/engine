// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuditableItemGraphRestClient } from "@3sixty/auditable-item-graph-rest-client";
import {
	type AuditableItemGraphChangeset,
	AuditableItemGraphService,
	type AuditableItemGraphVertex,
	type AuditableItemGraphVertexIndex,
	initSchema as initSchemaAuditableItemGraph
} from "@3sixty/auditable-item-graph-service";
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import { ComponentFactory, type IComponent } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { AuditableItemGraphComponentConfig } from "../models/config/auditableItemGraphComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { AuditableItemGraphComponentType } from "../models/types/auditableItemGraphComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the auditable item graph component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuditableItemGraphComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuditableItemGraphComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuditableItemGraphComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaAuditableItemGraph();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.vertexEntityStorageType,
				nameof<AuditableItemGraphVertex>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.vertexIndexEntityStorageType,
				nameof<AuditableItemGraphVertexIndex>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.changesetEntityStorageType,
				nameof<AuditableItemGraphChangeset>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);

			return new AuditableItemGraphService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						immutableProofComponentType:
							engineCore.getRegisteredInstanceType("immutableProofComponent"),
						eventBusComponentType:
							engineCore.getRegisteredInstanceTypeOptional("eventBusComponent"),
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(AuditableItemGraphService)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(AuditableItemGraphService);
	} else if (instanceConfig.type === AuditableItemGraphComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AuditableItemGraphRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(AuditableItemGraphRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
