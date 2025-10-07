// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EngineCore, type IEngineCoreOptions } from "@twin.org/engine-core";
import type { IEngineState } from "@twin.org/engine-models";
import type { IEngineConfig } from "@twin.org/engine-types";
import { nameof } from "@twin.org/nameof";
import coreTypeInitialisers from "./data/coreTypeInitialisers.json";

/**
 * The engine with built in types.
 */
export class Engine<
	C extends IEngineConfig = IEngineConfig,
	S extends IEngineState = IEngineState
> extends EngineCore<C, S> {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<Engine>();

	/**
	 * Create a new instance of Engine.
	 * @param options The options for the engine.
	 */
	constructor(options?: IEngineCoreOptions<C, S>) {
		super(options);

		this.addCoreTypeInitialisers();
	}

	/**
	 * Add the core type initializers.
	 * @internal
	 */
	private addCoreTypeInitialisers(): void {
		for (const initializer of coreTypeInitialisers) {
			this.addTypeInitialiser(initializer.type, initializer.module, initializer.method);
		}
	}
}
