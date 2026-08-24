// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AuditableItemStreamRestClient } from "@twin.org/auditable-item-stream-rest-client";
import {
	type AuditableItemStream,
	type AuditableItemStreamEntry,
	AuditableItemStreamService,
	initSchema as initSchemaAuditableItemStream
} from "@twin.org/auditable-item-stream-service";
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { AuditableItemStreamComponentConfig } from "../models/config/auditableItemStreamComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { AuditableItemStreamComponentType } from "../models/types/auditableItemStreamComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the auditable item stream component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseAuditableItemStreamComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuditableItemStreamComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === AuditableItemStreamComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaAuditableItemStream();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.streamEntityStorageType,
				nameof<AuditableItemStream>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.streamEntryEntityStorageType,
				nameof<AuditableItemStreamEntry>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);

			return new AuditableItemStreamService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						immutableProofComponentType:
							engineCore.getRegisteredInstanceType("immutableProofComponent"),
						eventBusComponentType:
							engineCore.getRegisteredInstanceTypeOptional("eventBusComponent"),
						telemetryComponentType: engineCore.getRegisteredSilencedType(
							"telemetry",
							nameof(AuditableItemStreamService)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(AuditableItemStreamService);
	} else if (instanceConfig.type === AuditableItemStreamComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new AuditableItemStreamRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(AuditableItemStreamRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
