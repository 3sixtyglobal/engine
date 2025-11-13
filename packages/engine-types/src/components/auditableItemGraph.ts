// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuditableItemGraphComponent } from "@twin.org/auditable-item-graph-models";
import { AuditableItemGraphRestClient } from "@twin.org/auditable-item-graph-rest-client";
import {
	type AuditableItemGraphChangeset,
	AuditableItemGraphService,
	type AuditableItemGraphVertex,
	initSchema as initSchemaAuditableItemGraph
} from "@twin.org/auditable-item-graph-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { AuditableItemGraphComponentConfig } from "../models/config/auditableItemGraphComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { AuditableItemGraphComponentType } from "../models/types/auditableItemGraphComponentType.js";

/**
 * Initialise the auditable item graph component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseAuditableItemGraphComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuditableItemGraphComponentConfig
): Promise<{ instanceType?: string; factory?: typeof ComponentFactory; component?: IComponent }> {
	let component: IAuditableItemGraphComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === AuditableItemGraphComponentType.Service) {
		initSchemaAuditableItemGraph();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.vertexEntityStorageType,
			nameof<AuditableItemGraphVertex>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.changesetEntityStorageType,
			nameof<AuditableItemGraphChangeset>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);

		component = new AuditableItemGraphService({
			immutableProofComponentType: engineCore.getRegisteredInstanceType("immutableProofComponent"),
			eventBusComponentType: engineCore.getRegisteredInstanceTypeOptional("eventBusComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(AuditableItemGraphService);
	} else if (instanceConfig.type === AuditableItemGraphComponentType.RestClient) {
		component = new AuditableItemGraphRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(AuditableItemGraphRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
