// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IContextIds } from "@twin.org/context";
import type { IError } from "@twin.org/core";
import type { IEngineCoreConfig } from "./config/IEngineCoreConfig.js";
import type { IEngineCoreTypeConfig } from "./config/IEngineCoreTypeConfig.js";
import type { IEngineCoreClone } from "./IEngineCoreClone.js";
import type { IEngineState } from "./IEngineState.js";

/**
 * Interface describing the engine core methods.
 */
export interface IEngineCore<
	C extends IEngineCoreConfig = IEngineCoreConfig,
	S extends IEngineState = IEngineState
> {
	/**
	 * Add a type initialiser.
	 * @param type The type to add the initialiser for.
	 * @param module The name of the module which contains the initialiser method.
	 * @param method The name of the method to call.
	 */
	addTypeInitialiser(type: string, module: string, method: string): void;

	/**
	 * Get the type config for a specific type.
	 * @param type The type to get the config for.
	 * @returns The type config or undefined if not found.
	 */
	getTypeConfig(type: string): IEngineCoreTypeConfig[] | undefined;

	/**
	 * Add a context ID key to the engine.
	 * @param key The context ID key.
	 * @param componentFeatures The component features for the context ID handler.
	 */
	addContextIdKey(key: string, componentFeatures: string[]): void;

	/**
	 * Get the context ID keys for the engine.
	 * @returns The context IDs keys.
	 */
	getContextIdKeys(): string[];

	/**
	 * Add a context ID to the engine.
	 * @param key The context ID key.
	 * @param value The context ID value.
	 */
	addContextId(key: string, value: string): void;

	/**
	 * Get the context IDs for the engine.
	 * @returns The context IDs or undefined if none are set.
	 */
	getContextIds(): IContextIds | undefined;

	/**
	 * Start the engine core.
	 * @param skipComponentStart Should the component start be skipped.
	 * @returns Nothing.
	 */
	start(skipComponentStart?: boolean): Promise<void>;

	/**
	 * Stop the engine core.
	 * @returns Nothing.
	 */
	stop(): Promise<void>;

	/**
	 * Is the engine started.
	 * @returns True if the engine is started.
	 */
	isStarted(): boolean;

	/**
	 * Is this the primary engine instance.
	 * @returns True if the engine is the primary instance.
	 */
	isPrimary(): boolean;

	/**
	 * Is this engine instance a clone.
	 * @returns True if the engine instance is a clone.
	 */
	isClone(): boolean;

	/**
	 * Log info.
	 * @param message The message to log.
	 */
	logInfo(message: string): void;

	/**
	 * Log error.
	 * @param error The error to log.
	 */
	logError(error: IError): void;

	/**
	 * Get the config for the engine.
	 * @returns The config for the engine.
	 */
	getConfig(): C;

	/**
	 * Get the state of the engine.
	 * @returns The state of the engine.
	 */
	getState(): S;

	/**
	 * Set the state to dirty so it gets saved.
	 */
	setStateDirty(): void;

	/**
	 * Get all the registered instances.
	 * @returns The registered instances.
	 */
	getRegisteredInstances(): {
		[name: string]: {
			type: string;
			features?: string[];
		}[];
	};

	/**
	 * Get the registered instance type for the component/connector.
	 * @param componentConnectorType The type of the component/connector.
	 * @param features The requested features of the component, if not specified the default entry will be retrieved.
	 * @returns The instance type matching the criteria if one is registered.
	 * @throws If a matching instance was not found.
	 */
	getRegisteredInstanceType(componentConnectorType: string, features?: string[]): string;

	/**
	 * Get the registered instance type for the component/connector.
	 * @param componentConnectorType The type of the component/connector.
	 * @param features The requested features of the component, if not specified the default entry will be retrieved.
	 * @returns The instance type matching the criteria if one is registered.
	 */
	getRegisteredInstanceTypeOptional(
		componentConnectorType: string,
		features?: string[]
	): string | undefined;

	/**
	 * Get the data required to create a clone of the engine.
	 * @returns The clone data.
	 */
	getCloneData(): IEngineCoreClone<C, S>;

	/**
	 * Populate the engine from the clone data.
	 * @param cloneData The clone data to populate from.
	 * @param contextIds The context IDs to use for the clone.
	 * @param silent Should the clone be silent.
	 */
	populateClone(
		cloneData: IEngineCoreClone<C, S>,
		contextIds?: IContextIds,
		silent?: boolean
	): void;
}
