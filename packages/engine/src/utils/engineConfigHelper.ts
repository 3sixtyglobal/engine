// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards, Is, StringHelper } from "@twin.org/core";
import { EntityStorageComponentType, type IEngineConfig } from "@twin.org/engine-types";
import { EntitySchemaFactory, type IEntitySchema } from "@twin.org/entity";
import { nameof } from "@twin.org/nameof";

/**
 * Helper methods for engine config.
 */
export class EngineConfigHelper {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<EngineConfigHelper>();

	/**
	 * Add a custom entity storage to the engine configuration.
	 * @param engineConfig The engine configuration.
	 * @param entityTypeName The entity type name.
	 * @param entitySchema The entity schema.
	 * @param restPath The rest path to serve the entity storage from, leave undefined for no endpoints.
	 * @param partitionContextIds The context ids to use for partitioning, leave undefined to partition by whichever of the node and tenant keys are registered with the engine when it starts.
	 */
	public static addCustomEntityStorage<T>(
		engineConfig: IEngineConfig,
		entityTypeName: string,
		entitySchema: IEntitySchema<T>,
		restPath?: string,
		partitionContextIds?: string[]
	): void {
		Guards.object<IEngineConfig>(EngineConfigHelper.CLASS_NAME, nameof(engineConfig), engineConfig);
		Guards.stringValue(EngineConfigHelper.CLASS_NAME, nameof(entityTypeName), entityTypeName);
		Guards.object<IEntitySchema>(EngineConfigHelper.CLASS_NAME, nameof(entitySchema), entitySchema);

		engineConfig.types.entityStorageComponent ??= [];

		EntitySchemaFactory.register(entityTypeName, () => entitySchema);

		engineConfig.types.entityStorageComponent.push({
			type: EntityStorageComponentType.Service,
			options: {
				entityStorageType: entityTypeName,
				partitionContextIds
			},
			overrideInstanceType: StringHelper.kebabCase(entityTypeName),
			restPath: Is.stringValue(restPath) ? restPath : undefined
		});
	}
}
