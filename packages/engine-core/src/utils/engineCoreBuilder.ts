// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IContextIds } from "@twin.org/context";
import {
	EngineCoreFactory,
	type IEngineCore,
	type IEngineCoreClone,
	type EngineLogLevel
} from "@twin.org/engine-models";
import { EngineCore } from "../engineCore.js";

/**
 * Builder class for creating engine core instances.
 */
export class EngineCoreBuilder {
	/**
	 * Creates a new engine core instance populated from clone data.
	 * Registers the instance in EngineCoreFactory under the given instanceName.
	 * Safe to call from any V8 isolate (main thread or worker thread).
	 * @param instanceName The name to register the engine under in EngineCoreFactory.
	 * @param cloneData The serialized clone data from the source engine.
	 * @param contextIds Optional context IDs to apply during population.
	 * @param options Optional population options such as logLevel, types, and entityTypes.
	 * @param options.logLevel The log level to use for the engine core instance.
	 * @param options.types The types allowlist for the engine core instance.
	 * @param options.entityTypes The entity types allowlist for the engine core instance.
	 * @returns The populated engine core instance.
	 */
	public static fromClone(
		instanceName: string,
		cloneData: IEngineCoreClone,
		contextIds?: IContextIds,
		options?: { logLevel?: EngineLogLevel; types?: string[]; entityTypes?: string[] }
	): IEngineCore {
		const engineCore = new EngineCore();
		engineCore.populateClone(cloneData, contextIds, options);
		EngineCoreFactory.register(instanceName, () => engineCore);
		return engineCore;
	}
}
