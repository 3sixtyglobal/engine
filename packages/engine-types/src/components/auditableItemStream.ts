// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuditableItemStreamComponent } from "@twin.org/auditable-item-stream-models";
import { AuditableItemStreamClient } from "@twin.org/auditable-item-stream-rest-client";
import {
	type AuditableItemStream,
	type AuditableItemStreamEntry,
	AuditableItemStreamService,
	initSchema as initSchemaAuditableItemStream
} from "@twin.org/auditable-item-stream-service";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import { initialiseEntityStorageConnector } from "./entityStorage";
import type { AuditableItemStreamComponentConfig } from "../models/config/auditableItemStreamComponentConfig";
import type { IEngineConfig } from "../models/IEngineConfig";
import { AuditableItemStreamComponentType } from "../models/types/auditableItemStreamComponentType";

/**
 * Initialise the auditable item stream component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseAuditableItemStreamComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: AuditableItemStreamComponentConfig
): Promise<{ instanceType?: string; factory?: typeof ComponentFactory; component?: IComponent }> {
	let component: IAuditableItemStreamComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === AuditableItemStreamComponentType.Service) {
		initSchemaAuditableItemStream();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.streamEntityStorageType,
			nameof<AuditableItemStream>()
		);
		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.streamEntryEntityStorageType,
			nameof<AuditableItemStreamEntry>()
		);

		component = new AuditableItemStreamService({
			immutableProofComponentType: engineCore.getRegisteredInstanceType("immutableProofComponent"),
			eventBusComponentType: engineCore.getRegisteredInstanceTypeOptional("eventBusComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(AuditableItemStreamService);
	} else if (instanceConfig.type === AuditableItemStreamComponentType.RestClient) {
		component = new AuditableItemStreamClient(instanceConfig.options);
		instanceType = nameofKebabCase(AuditableItemStreamClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
