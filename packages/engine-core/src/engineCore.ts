// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { isMainThread } from "node:worker_threads";
import {
	ContextIdHandlerFactory,
	ContextIdStore,
	type IContextIdHandler,
	type IContextIds
} from "@3sixty/context";
import {
	BaseError,
	ComponentFactory,
	ErrorHelper,
	FacadeFactory,
	Factory,
	GeneralError,
	Guards,
	I18n,
	type IComponent,
	type IError,
	Is,
	ObjectHelper
} from "@3sixty/core";
import {
	EngineCloneMode,
	EngineLogLevel,
	type EngineTypeInitialiser,
	type IEngineCore,
	type IEngineCoreClone,
	type IEngineCoreConfig,
	type IEngineCoreContext,
	type IEngineCoreTypeConfig,
	type IEngineFacadeConfig,
	type IEngineState,
	type IEngineStateStorage
} from "@3sixty/engine-models";
import { EntitySchemaFactory, type IEntitySchema } from "@3sixty/entity";
import { ConsoleLoggingConnector } from "@3sixty/logging-connector-console";
import {
	type ILoggingComponent,
	type ILoggingConnector,
	LoggingConnectorFactory,
	LogLevel,
	SilentLoggingConnector
} from "@3sixty/logging-models";
import { LoggingService } from "@3sixty/logging-service";
import { ModuleHelper } from "@3sixty/modules";
import { nameof, nameofCamelCase } from "@3sixty/nameof";
import type { IEngineCoreOptions } from "./models/IEngineCoreOptions.js";
import type { IEngineCoreResolvedType } from "./models/IEngineCoreResolvedType.js";
import { MemoryStateStorage } from "./storage/memoryStateStorage.js";

/**
 * Core for the engine.
 */
export class EngineCore<
	C extends IEngineCoreConfig = IEngineCoreConfig,
	S extends IEngineState = IEngineState
> implements IEngineCore<C, S> {
	/**
	 * Name for the engine logger component, used for direct console logging.
	 */
	public static readonly LOGGING_COMPONENT_TYPE_NAME: string = "engine-logging-service";

	/**
	 * Name for the engine logger connector, used for direct console logging.
	 */
	public static readonly LOGGING_CONNECTOR_TYPE_NAME: string = "engine-logging-connector";

	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<EngineCore>();

	/**
	 * The core context.
	 */
	protected _context: IEngineCoreContext<C, S>;

	/**
	 * The context ID keys.
	 */
	protected readonly _contextIdKeys: { key: string; componentFeatures: string[] }[];

	/**
	 * The context IDs.
	 */
	protected _contextIds?: IContextIds;

	/**
	 * The state storage interface.
	 * @internal
	 */
	private _stateStorage?: IEngineStateStorage<S>;

	/**
	 * The logging component for the engine.
	 * @internal
	 */
	private _engineLoggingComponent?: ILoggingComponent;

	/**
	 * Skip the bootstrap process.
	 * @internal
	 */
	private _skipBootstrap?: boolean;

	/**
	 * The type initialisers.
	 * @internal
	 */
	private _typeInitialisers: {
		type: string;
		module: string;
		method: string;
	}[];

	/**
	 * Is the engine started.
	 * @internal
	 */
	private _isStarted: boolean;

	/**
	 * Is the engine a clone.
	 * @internal
	 */
	private _isClone: boolean;

	/**
	 * The facades activated by this engine, so they can be deactivated if the start fails.
	 * @internal
	 */
	private _activatedFacades: { factory: Factory<unknown>; facadeName: string }[];

	/**
	 * Has start been called on the engine, used to release the instances before a restart.
	 * @internal
	 */
	private _hasStartBeenAttempted: boolean;

	/**
	 * Add type initialisers to the engine.
	 * @internal
	 */
	private readonly _populateTypeInitialisers?: (
		engineCore: IEngineCore<C, S>,
		context: IEngineCoreContext<C, S>
	) => void;

	/**
	 * Method for bootstrapping any data for the engine.
	 * @internal
	 */
	private readonly _customBootstrap?: (
		engineCore: IEngineCore<C, S>,
		context: IEngineCoreContext<C, S>
	) => Promise<void>;

	/**
	 * Create a new instance of EngineCore.
	 * @param options The options for the engine.
	 */
	constructor(options?: IEngineCoreOptions<C, S>) {
		options = options ?? {};
		options.config = options.config ?? ({} as C);
		options.config.debug = options.config.debug ?? false;
		options.config.silent = options.config.silent ?? false;
		options.config.types ??= {};

		this._skipBootstrap = options.skipBootstrap ?? false;
		this._populateTypeInitialisers = options.populateTypeInitialisers;
		this._customBootstrap = options.customBootstrap;
		this._typeInitialisers = [];
		this._contextIdKeys = [];

		this._context = {
			config: options.config,
			registeredInstances: {},
			componentInstances: [],
			state: {} as S,
			stateDirty: false
		};
		this._stateStorage = options.stateStorage;
		this._isStarted = false;
		this._isClone = false;
		this._activatedFacades = [];
		this._hasStartBeenAttempted = false;

		if (Is.function(this._populateTypeInitialisers)) {
			this._populateTypeInitialisers(this, this._context);
		}
	}

	/**
	 * Add a type initialiser.
	 * @param type The type to add the initialiser for.
	 * @param module The name of the module which contains the initialiser method.
	 * @param method The name of the method to call.
	 */
	public addTypeInitialiser(type: string, module: string, method: string): void {
		Guards.stringValue(EngineCore.CLASS_NAME, nameof(type), type);
		Guards.stringValue(EngineCore.CLASS_NAME, nameof(module), module);
		Guards.stringValue(EngineCore.CLASS_NAME, nameof(method), method);

		const currentIndex = this._typeInitialisers.findIndex(t => t.type === type);
		if (currentIndex >= 0) {
			this._typeInitialisers[currentIndex].module = module;
			this._typeInitialisers[currentIndex].method = method;
		} else {
			this._typeInitialisers.push({
				type,
				module,
				method
			});
		}
	}

	/**
	 * Get the type config for a specific type.
	 * @param type The type to get the config for.
	 * @returns The type config or undefined if not found.
	 */
	public getTypeConfig(type: string): IEngineCoreTypeConfig[] | undefined {
		Guards.stringValue(EngineCore.CLASS_NAME, nameof(type), type);
		return this._context.config.types?.[type];
	}

	/**
	 * Add a context ID key to the engine.
	 * @param key The context ID key.
	 * @param componentFeatures The component features for the context ID handler.
	 */
	public addContextIdKey(key: string, componentFeatures: string[]): void {
		const exists = this._contextIdKeys.find(k => k.key === key);
		if (Is.empty(exists)) {
			this._contextIdKeys.push({ key, componentFeatures });
		}
	}

	/**
	 * Get the context ID keys for the engine.
	 * @returns The context IDs keys.
	 */
	public getContextIdKeys(): string[] {
		return this._contextIdKeys.map(k => k.key);
	}

	/**
	 * Add a context ID to the engine.
	 * @param key The context ID key.
	 * @param value The context ID value.
	 */
	public addContextId(key: string, value: string): void {
		this._contextIds ??= {};
		this._contextIds[key] = value;
	}

	/**
	 * Get the context IDs for the engine.
	 * @returns The context IDs or undefined if none are set.
	 */
	public getContextIds(): IContextIds | undefined {
		return this._contextIds;
	}

	/**
	 * Start the engine core.
	 * @param skipComponentStart Should the component start be skipped.
	 * @returns A promise that resolves when the engine and all components have started.
	 */
	public async start(skipComponentStart?: boolean): Promise<void> {
		if (!this._isStarted) {
			// Every type is constructed again on each start, so the instances from a previous
			// start are released, otherwise they would be started alongside the new ones.
			if (this._hasStartBeenAttempted) {
				this.releaseInstances();
			}
			this._hasStartBeenAttempted = true;

			this.setupEngineLogger();
			await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.starting`));

			if (this._context.config.debug) {
				await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.debuggingEnabled`));
			}

			const skipComponent = skipComponentStart ?? false;
			try {
				await this.stateLoad();

				// Resolving every type before anything is constructed, so a component
				// can be handed the name of one which is initialised after it.
				const resolvedTypes: IEngineCoreResolvedType[] = [];
				for (const { type, module, method } of this._typeInitialisers) {
					resolvedTypes.push(...(await this.resolveTypeConfig(type, module, method)));
				}

				// The facades are constructed and activated before any other component,
				// so components are wrapped by the facades.
				for (const resolved of resolvedTypes.filter(r => r.typeKey === "facade")) {
					this.constructTypeConfig(resolved);
				}

				this.activateFacades();

				for (const resolved of resolvedTypes.filter(r => r.typeKey !== "facade")) {
					this.constructTypeConfig(resolved);
				}

				this.initialiseContextIdHandlers();

				await this.bootstrap();

				this._isStarted = true;

				if (!skipComponent) {
					await this.logInfo(
						I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentsStarting`)
					);

					const componentTimings: {
						className: string;
						instanceType: string;
						elapsedMs: number;
					}[] = [];
					const componentsStartTime = performance.now();

					await ContextIdStore.run(this._contextIds ?? {}, async () => {
						for (const instance of this._context.componentInstances) {
							if (!instance.initialised) {
								instance.initialised = true;

								const startMethod = instance.component.start?.bind(instance.component);
								if (Is.function(startMethod)) {
									await this.logInfo(
										I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentStarting`, {
											className: instance.component.className(),
											instanceType: instance.instanceType
										})
									);

									const componentStartTime = performance.now();
									try {
										await startMethod(EngineCore.LOGGING_COMPONENT_TYPE_NAME);
									} catch (err) {
										await this.logError(
											new GeneralError(
												EngineCore.CLASS_NAME,
												"componentStartFailed",
												{
													className: instance.component.className(),
													instanceType: instance.instanceType
												},
												BaseError.fromError(err)
											)
										);

										throw err;
									}

									const elapsedMs = Math.round(performance.now() - componentStartTime);
									componentTimings.push({
										className: instance.component.className(),
										instanceType: instance.instanceType,
										elapsedMs
									});
									await this.logDebug(
										I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentStarted`, {
											className: instance.component.className(),
											instanceType: instance.instanceType,
											elapsedMs
										})
									);
								}
							}
						}
					});

					if (componentTimings.length > 0) {
						const totalMs = Math.round(performance.now() - componentsStartTime);
						const slowestComponents = componentTimings
							.sort((a, b) => b.elapsedMs - a.elapsedMs)
							.slice(0, 3)
							.map(t => `${t.className} (${t.instanceType}) ${t.elapsedMs}ms`)
							.join(", ");
						await this.logDebug(
							I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentsSummary`, {
								totalMs,
								slowestComponents
							})
						);
					}

					await this.logInfo(
						I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentsComplete`)
					);
				} else {
					// If we are skipping component start then just mark them as initialised
					// we still need to be able to call stop on them to clean up
					for (const instance of this._context.componentInstances) {
						instance.initialised = true;
					}
				}

				await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.started`));
			} catch (err) {
				await this.stop();
				// Stop only deactivates the facades of a started engine, so a failure before
				// the engine is marked as started deactivates them here.
				this.deactivateFacades();
				await this.logError(BaseError.fromError(err));
				throw err;
			} finally {
				await this.stateSave();
			}
		}
	}

	/**
	 * Stop the engine core.
	 * @returns A promise that resolves when all components have stopped and state has been saved.
	 */
	public async stop(): Promise<void> {
		if (this._isStarted) {
			this._isStarted = false;

			await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.stopping`));
			await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentsStopping`));

			await ContextIdStore.run(this._contextIds ?? {}, async () => {
				// Stopped in reverse start order, as a component started later may depend on an
				// earlier one still running to complete its own shutdown work.
				for (const instance of [...this._context.componentInstances].reverse()) {
					if (instance.initialised) {
						instance.initialised = false;
						const stopMethod = instance.component.stop?.bind(instance.component);
						if (Is.function(stopMethod)) {
							await this.logInfo(
								I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentStopping`, {
									className: instance.component.className(),
									instanceType: instance.instanceType
								})
							);

							try {
								await stopMethod(EngineCore.LOGGING_COMPONENT_TYPE_NAME);
							} catch (err) {
								await this.logError(
									new GeneralError(
										EngineCore.CLASS_NAME,
										"componentStopFailed",
										{
											className: instance.component.className(),
											instanceType: instance.instanceType
										},
										BaseError.fromError(err)
									)
								);
							}
						}
					}
				}
			});

			// The facades are applied to shared factories, so they must not stay active once
			// the engine has stopped.
			this.deactivateFacades();

			await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.componentsStopped`));
			await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.stopped`));
		}

		await this.stateSave();
	}

	/**
	 * Is the engine started.
	 * @returns True if the engine is started.
	 */
	public isStarted(): boolean {
		return this._isStarted;
	}

	/**
	 * Is this the primary engine instance.
	 * @returns True if the engine is the primary instance.
	 */
	public isPrimary(): boolean {
		return isMainThread && !this._isClone;
	}

	/**
	 * Is this engine instance a clone.
	 * @returns True if the engine instance is a clone.
	 */
	public isClone(): boolean {
		return this._isClone;
	}

	/**
	 * Log info.
	 * @param message The message to log.
	 * @returns A promise that resolves when the message has been logged.
	 */
	public async logInfo(message: string): Promise<void> {
		if (!this._context.config.silentComponents?.logging?.includes(EngineCore.CLASS_NAME)) {
			await this._engineLoggingComponent?.log({
				source: EngineCore.CLASS_NAME,
				level: "info",
				message
			});
		}
	}

	/**
	 * Log error.
	 * @param error The error to log.
	 * @returns A promise that resolves when the error has been logged.
	 */
	public async logError(error: IError): Promise<void> {
		const formattedErrors = ErrorHelper.localizeErrors(error);
		for (const formattedError of formattedErrors) {
			let message = Is.stringValue(formattedError.source)
				? `${formattedError.source}: ${formattedError.message}`
				: formattedError.message;
			if (this._context.config.debug && Is.stringValue(formattedError.stack)) {
				message += `\n${formattedError.stack}`;
			}
			await this._engineLoggingComponent?.log({
				source: EngineCore.CLASS_NAME,
				level: "error",
				message
			});
		}
	}

	/**
	 * Get the config for the engine.
	 * @returns The config for the engine.
	 */
	public getConfig(): C {
		return this._context.config;
	}

	/**
	 * Get the state of the engine.
	 * @returns The state of the engine.
	 */
	public getState(): S {
		return this._context.state;
	}

	/**
	 * Set the state to dirty so it gets saved.
	 */
	public setStateDirty(): void {
		this._context.stateDirty = true;
	}

	/**
	 * Get all the registered instances.
	 * @returns The registered instances.
	 */
	public getRegisteredInstances(): {
		[name: string]: {
			type: string;
			isDefault?: boolean;
			features?: string[];
		}[];
	} {
		return this._context.registeredInstances;
	}

	/**
	 * Get the registered instance type for the component/connector.
	 * @param componentConnectorType The type of the component/connector.
	 * @param features The requested features of the component, if not specified the default entry will be retrieved.
	 * @returns The instance type matching the criteria if one is registered.
	 * @throws If a matching instance was not found.
	 */
	public getRegisteredInstanceType(componentConnectorType: string, features?: string[]): string {
		Guards.stringValue(
			EngineCore.CLASS_NAME,
			nameof(componentConnectorType),
			componentConnectorType
		);

		const registeredType = this.getRegisteredInstanceTypeOptional(componentConnectorType, features);

		if (!Is.stringValue(registeredType)) {
			if (Is.arrayValue(features)) {
				throw new GeneralError(EngineCore.CLASS_NAME, "instanceTypeNotFoundWithFeatures", {
					type: componentConnectorType,
					features: features.join(",")
				});
			}
			throw new GeneralError(EngineCore.CLASS_NAME, "instanceTypeNotFound", {
				type: componentConnectorType
			});
		}

		return registeredType;
	}

	/**
	 * Get the registered instance type for the component/connector if it exists.
	 * @param componentConnectorType The type of the component/connector.
	 * @param features The requested features of the component, if not specified the default entry will be retrieved.
	 * @returns The instance type matching the criteria if one is registered.
	 */
	public getRegisteredInstanceTypeOptional(
		componentConnectorType: string,
		features?: string[]
	): string | undefined {
		let registeredType: string | undefined;

		const registeredTypes = this._context.registeredInstances[componentConnectorType];
		if (Is.arrayValue(registeredTypes)) {
			if (Is.arrayValue(features)) {
				registeredType = registeredTypes.find(t =>
					t.features?.every(f => features.includes(f))
				)?.type;
			} else {
				// First look for the default entry
				registeredType = registeredTypes.find(t => t.isDefault)?.type;

				// Can't find a default so just use the first entry
				if (!Is.stringValue(registeredType)) {
					registeredType = registeredTypes[0]?.type;
				}
			}
		}

		return registeredType;
	}

	/**
	 * Get the registered component type for the given component type, if not silenced.
	 * @param componentType The type of component to get the registered type for.
	 * @param componentName The name of the component to get the type for.
	 * @returns The component type name if one is registered and not silenced.
	 */
	public getRegisteredSilencedType(
		componentType: "logging" | "telemetry" | "tracing",
		componentName: string
	): string | undefined {
		if (this._context.config.silentComponents?.[componentType]?.includes(componentName)) {
			return undefined;
		}
		return this.getRegisteredInstanceTypeOptional(`${componentType}Component`);
	}

	/**
	 * Get the registered components.
	 * @returns The registered components.
	 */
	public async getRegisteredComponents(): Promise<
		{
			instanceType: string;
			component: IComponent;
			initialised: boolean;
		}[]
	> {
		return this._context.componentInstances;
	}

	/**
	 * Add a registered component to the engine.
	 * @param instanceType The instance type to register the component under.
	 * @param component The component to register.
	 * @returns A promise that resolves when the component has been registered.
	 */
	public async addRegisteredComponent(instanceType: string, component: IComponent): Promise<void> {
		this._context.componentInstances.push({ instanceType, component, initialised: true });
	}

	/**
	 * Get the data required to create a clone of the engine.
	 * @returns The clone data.
	 */
	public getCloneData(): IEngineCoreClone<C, S> {
		const entitySchemas: {
			[schema: string]: IEntitySchema;
		} = {};

		const entitySchemaNames = EntitySchemaFactory.names();
		for (const schemaName of entitySchemaNames) {
			entitySchemas[schemaName] = EntitySchemaFactory.get(schemaName);
		}

		const sourceConfig = this._context.config;
		const cloneTypes: { [type: string]: IEngineCoreTypeConfig[] } = {};
		for (const typeKey of Object.keys(sourceConfig.types ?? {})) {
			const entries = sourceConfig.types?.[typeKey];
			if (Is.arrayValue(entries)) {
				cloneTypes[typeKey] = [...entries];
			}
		}

		const cloneData: IEngineCoreClone<C, S> = {
			config: { ...sourceConfig, types: cloneTypes },
			state: ObjectHelper.clone(this._context.state),
			typeInitialisers: ObjectHelper.clone(this._typeInitialisers),
			entitySchemas,
			contextIdKeys: ObjectHelper.clone(this._contextIdKeys)
		};

		return cloneData;
	}

	/**
	 * Populate the engine from the clone data.
	 * @param cloneData The clone data to populate from.
	 * @param contextIds The context IDs to use for the clone.
	 * @param options An optional object containing the log level, types and entity types to include.
	 * @param options.logLevel The log level for the clone, true maps to error level.
	 * @param options.types An optional allowlist of type keys to include; when omitted all types are cloned.
	 * @param options.entityTypes An optional allowlist of entity type names; when provided only those entity schemas and their associated storage components are cloned.
	 * @param options.facades An optional override for the facades the clone activates.
	 */
	public populateClone(
		cloneData: IEngineCoreClone<C, S>,
		contextIds?: IContextIds,
		options?:
			| boolean
			| {
					logLevel?: EngineLogLevel;
					types?: string[];
					entityTypes?: string[];
					facades?: { [factoryTypeName: string]: IEngineFacadeConfig[] };
			  }
	): void {
		Guards.object(EngineCore.CLASS_NAME, nameof(cloneData), cloneData);
		Guards.object(EngineCore.CLASS_NAME, nameof(cloneData.config), cloneData.config);
		Guards.object(EngineCore.CLASS_NAME, nameof(cloneData.state), cloneData.state);
		Guards.array(
			EngineCore.CLASS_NAME,
			nameof(cloneData.typeInitialisers),
			cloneData.typeInitialisers
		);

		this._skipBootstrap = true;
		this._isClone = true;

		let optionsEntityTypes: string[] | undefined;
		let optionsTypes: string[] | undefined;
		let optionsFacades: { [factoryTypeName: string]: IEngineFacadeConfig[] } | undefined;
		// The clone data can be shared by several clones, so it is never modified.
		let cloneLogLevel = cloneData.config.logLevel;
		if (Is.object(options)) {
			if (Is.notEmpty(options.logLevel)) {
				const logLevel = options.logLevel;
				Guards.arrayOneOf(
					EngineCore.CLASS_NAME,
					nameof(logLevel),
					logLevel,
					Object.values(EngineLogLevel)
				);
				cloneLogLevel = logLevel;
			}
			optionsEntityTypes = options.entityTypes;
			optionsTypes = options.types;
			optionsFacades = options.facades;
		} else if (options === true) {
			cloneLogLevel = EngineLogLevel.Error;
		}

		let cloneEntitySchemas = cloneData.entitySchemas;

		const sourceTypes = cloneData.config.types ?? {};
		const partialTypes: { [type: string]: IEngineCoreTypeConfig[] } = {};
		for (const typeKey of Object.keys(sourceTypes)) {
			const entries = sourceTypes[typeKey];
			if (Is.arrayValue(entries)) {
				const inAllowlist = !Is.arrayValue(optionsTypes) || optionsTypes.includes(typeKey);
				const explicitlyInAllowlist = Is.arrayValue(optionsTypes) && optionsTypes.includes(typeKey);
				const cloneableEntries = entries.filter(e => {
					if (e.cloneMode === EngineCloneMode.Never) {
						return explicitlyInAllowlist;
					}
					if (e.cloneMode === EngineCloneMode.Always) {
						return true;
					}
					return inAllowlist;
				});
				if (cloneableEntries.length > 0) {
					partialTypes[typeKey] = cloneableEntries;
				}
			}
		}

		let cloneConfig: IEngineCoreConfig = {
			...cloneData.config,
			logLevel: cloneLogLevel,
			types: partialTypes
		};

		if (Is.arrayValue(optionsEntityTypes)) {
			const filteredSchemas: { [schema: string]: IEntitySchema } = {};
			for (const schemaName of Object.keys(cloneData.entitySchemas)) {
				if (optionsEntityTypes.includes(schemaName)) {
					filteredSchemas[schemaName] = cloneData.entitySchemas[schemaName];
				}
			}
			cloneEntitySchemas = filteredSchemas;

			const filteredTypes: { [type: string]: IEngineCoreTypeConfig[] } = {};
			for (const typeKey of Object.keys(partialTypes)) {
				const kept = partialTypes[typeKey].filter(e => {
					const storageType = Is.object(e.options)
						? ObjectHelper.propertyGet(e.options, "entityStorageType")
						: undefined;
					return Is.stringValue(storageType) ? optionsEntityTypes.includes(storageType) : true;
				});
				if (kept.length > 0) {
					filteredTypes[typeKey] = kept;
				}
			}
			cloneConfig = { ...cloneData.config, logLevel: cloneLogLevel, types: filteredTypes };
		}

		if (Is.object(optionsFacades)) {
			cloneConfig = { ...cloneConfig, facades: optionsFacades };
		}

		this._context = {
			config: cloneConfig as C,
			registeredInstances: {},
			componentInstances: [],
			state: {} as S,
			stateDirty: false
		};

		const includedTypeKeys = new Set(Object.keys(partialTypes));
		this._typeInitialisers = ObjectHelper.clone(
			Is.arrayValue(optionsTypes)
				? cloneData.typeInitialisers.filter(t => includedTypeKeys.has(t.type))
				: cloneData.typeInitialisers
		);
		for (const contextIdKey of ObjectHelper.clone(cloneData.contextIdKeys)) {
			this.addContextIdKey(contextIdKey.key, contextIdKey.componentFeatures);
		}
		this._contextIds = contextIds;

		for (const schemaName of Object.keys(cloneEntitySchemas)) {
			EntitySchemaFactory.register(schemaName, () => cloneEntitySchemas[schemaName]);
		}

		this._stateStorage = new MemoryStateStorage(true, ObjectHelper.clone(cloneData.state));
		this._isStarted = false;
		this._hasStartBeenAttempted = false;
	}

	/**
	 * Resolve the instances for a type without constructing them, recording the instance types so
	 * that they can be looked up before anything is constructed.
	 * @param typeKey The key of the type to resolve.
	 * @param module The module containing the initialiser.
	 * @param method The initialiser method in the module.
	 * @returns The resolved instances for the type.
	 * @internal
	 */
	private async resolveTypeConfig(
		typeKey: string,
		module: string,
		method: string
	): Promise<IEngineCoreResolvedType[]> {
		const typeConfig: IEngineCoreTypeConfig[] | undefined = this._context.config.types?.[typeKey];

		const resolved: IEngineCoreResolvedType[] = [];

		if (Is.arrayValue(typeConfig)) {
			const instanceMethod = await ModuleHelper.getModuleEntry<EngineTypeInitialiser>(
				module,
				method
			);

			for (let i = 0; i < typeConfig.length; i++) {
				await this.logInfo(
					I18n.formatMessage("engineCore.configuring", {
						componentType: typeKey,
						configType: typeConfig[i].type
					})
				);

				const result = instanceMethod(this, this._context, typeConfig[i]);

				if (!Is.stringValue(result.instanceTypeName) || !Is.function(result.createComponent)) {
					throw new GeneralError("engineCore", "componentUnknownType", {
						type: typeConfig[i].type,
						componentType: typeKey
					});
				}

				const finalInstanceType = typeConfig[i].overrideInstanceType ?? result.instanceTypeName;

				resolved.push({ typeKey, typeConfig: typeConfig[i], result, finalInstanceType });

				this._context.registeredInstances[typeKey] ??= [];
				this._context.registeredInstances[typeKey].push({
					type: finalInstanceType,
					isDefault: typeConfig[i].isDefault,
					features: typeConfig[i].features
				});
			}
		}

		return resolved;
	}

	/**
	 * Construct the instance for a resolved type and register it with its factory.
	 * @param resolved The resolved type to construct.
	 * @internal
	 */
	private constructTypeConfig(resolved: IEngineCoreResolvedType): void {
		const { typeConfig, result, finalInstanceType } = resolved;
		const componentCreateMethod = result.createComponent;

		if (Is.function(componentCreateMethod)) {
			// If this is a multi instance component we need to make sure we
			// generate a unique instance for every factory call
			// this is often used for REST clients where each instance might
			// use a different endpoint url
			// They are generated using the create method of factory
			// passing custom options, instead of the regular get method
			// which doesn't allow for custom options
			if (typeConfig.isMultiInstance ?? false) {
				result.factory?.register(finalInstanceType, params =>
					componentCreateMethod({
						type: typeConfig.type,
						options: params
					})
				);
			} else {
				const component = componentCreateMethod(typeConfig);
				this._context.componentInstances.push({
					instanceType: finalInstanceType,
					component,
					initialised: false
				});
				result.factory?.register(finalInstanceType, () => component);
			}
		}
	}

	/**
	 * Setup the engine logger.
	 * @internal
	 */
	private setupEngineLogger(): void {
		const logLevel =
			this._context.config.logLevel ??
			((this._context.config.silent ?? false) ? EngineLogLevel.None : EngineLogLevel.All);

		let engineLoggerConnector: ILoggingConnector;
		if (logLevel === EngineLogLevel.None) {
			engineLoggerConnector = new SilentLoggingConnector();
		} else {
			let levels: LogLevel[] | undefined;
			if (logLevel === EngineLogLevel.Error) {
				levels = [LogLevel.Error];
			} else if (logLevel === EngineLogLevel.Warn) {
				levels = [LogLevel.Error, LogLevel.Warn];
			}
			engineLoggerConnector = new ConsoleLoggingConnector({
				config: {
					translateMessages: true,
					hideGroups: true,
					disableColor: this._context.config.disableColor ?? false,
					levels
				}
			});
		}

		this._context.componentInstances.push({
			instanceType: EngineCore.LOGGING_CONNECTOR_TYPE_NAME,
			component: engineLoggerConnector,
			initialised: false
		});

		LoggingConnectorFactory.register(
			EngineCore.LOGGING_CONNECTOR_TYPE_NAME,
			() => engineLoggerConnector
		);

		this._context.registeredInstances.loggingConnector = [
			{
				type: EngineCore.LOGGING_CONNECTOR_TYPE_NAME
			}
		];

		const engineLoggerComponent = new LoggingService({
			loggingConnectorType: EngineCore.LOGGING_CONNECTOR_TYPE_NAME
		});
		this._engineLoggingComponent = engineLoggerComponent;

		ComponentFactory.register(EngineCore.LOGGING_COMPONENT_TYPE_NAME, () => engineLoggerComponent);
		this._context.registeredInstances.loggingComponent = [
			{
				type: EngineCore.LOGGING_COMPONENT_TYPE_NAME
			}
		];
	}

	/**
	 * Log debug.
	 * @param message The message to log.
	 * @returns A promise that resolves when the message has been logged.
	 * @internal
	 */
	private async logDebug(message: string): Promise<void> {
		if (!this._context.config.silentComponents?.logging?.includes(EngineCore.CLASS_NAME)) {
			await this._engineLoggingComponent?.log({
				source: EngineCore.CLASS_NAME,
				level: "debug",
				message
			});
		}
	}

	/**
	 * Load the state.
	 * @returns A promise that resolves when the state has been loaded.
	 * @internal
	 */
	private async stateLoad(): Promise<void> {
		if (this._stateStorage) {
			try {
				this._context.state = ((await this._stateStorage.load(this)) ?? {}) as S;
				this._context.stateDirty = false;
			} catch (err) {
				await this.logError(BaseError.fromError(err));
				throw err;
			}
		}
	}

	/**
	 * Save the state.
	 * @returns A promise that resolves when the state has been persisted.
	 * @internal
	 */
	private async stateSave(): Promise<void> {
		if (this._stateStorage && Is.notEmpty(this._context.state) && this._context.stateDirty) {
			// Cleared before saving, so a change marked dirty while the save is in progress is
			// kept for the next save instead of being discarded.
			this._context.stateDirty = false;
			try {
				await this._stateStorage.save(this, this._context.state);
			} catch (err) {
				this._context.stateDirty = true;
				await this.logError(BaseError.fromError(err));
			}
		}
	}

	/**
	 * Bootstrap the engine.
	 * @returns A promise that resolves when bootstrapping is complete.
	 * @internal
	 */
	private async bootstrap(): Promise<void> {
		if (!this._skipBootstrap) {
			await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.bootstrapStarted`));

			// First bootstrap the components.
			for (const instance of this._context.componentInstances) {
				const bootstrapMethod = instance.component.bootstrap?.bind(instance.component);
				if (Is.function(bootstrapMethod)) {
					await this.logInfo(
						I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.bootstrapping`, {
							className: instance.component.className(),
							instanceType: instance.instanceType
						})
					);

					const bootstrapSuccess = await bootstrapMethod(EngineCore.LOGGING_COMPONENT_TYPE_NAME);

					// If the bootstrap method failed then throw an error
					if (!bootstrapSuccess) {
						throw new GeneralError(EngineCore.CLASS_NAME, "bootstrapFailed", {
							className: instance.component.className(),
							instanceType: instance.instanceType
						});
					}
				}
			}
			// Now perform any custom bootstrap operations
			const customBootstrap = this._customBootstrap;
			if (Is.function(customBootstrap)) {
				await customBootstrap.call(this, this, this._context);
			}

			await this.logInfo(I18n.formatMessage(`${nameofCamelCase<EngineCore>()}.bootstrapComplete`));
		}
	}

	/**
	 * Activate the configured facades on the factories they apply to.
	 * @throws GeneralError if a facade, a factory, or an exclude pattern named in the configuration
	 * is not valid.
	 * @internal
	 */
	private activateFacades(): void {
		const facades = this._context.config.facades;
		this._activatedFacades = [];

		if (Is.empty(facades)) {
			return;
		}

		// The whole configuration is resolved before any of it is applied, as the factories are
		// shared, so a failure part way through would otherwise leave the factories already walked
		// with their facades active.
		const resolved: {
			factory: Factory<unknown>;
			facadeName: string;
			excludeTypes?: RegExp[];
		}[] = [];

		for (const factoryTypeName of Object.keys(facades)) {
			const factory = Factory.getFactory(factoryTypeName);

			if (Is.empty(factory)) {
				throw new GeneralError(EngineCore.CLASS_NAME, "facadeFactoryUnknown", {
					factoryTypeName,
					facades: facades[factoryTypeName].map(f => f.name).join(", ")
				});
			}

			for (const facade of facades[factoryTypeName]) {
				// Wrapping the facades themselves would mean resolving a facade in order to apply it.
				if (factory.typeName() === FacadeFactory.typeName()) {
					throw new GeneralError(EngineCore.CLASS_NAME, "facadeOnFacadeFactory", {
						facadeName: facade.name,
						factoryTypeName
					});
				}

				if (!FacadeFactory.hasName(facade.name)) {
					throw new GeneralError(EngineCore.CLASS_NAME, "facadeUnknown", {
						facadeName: facade.name,
						factoryTypeName
					});
				}

				resolved.push({
					factory,
					facadeName: facade.name,
					// The config carries the patterns as strings, as it is serialisable.
					excludeTypes: facade.excludeTypes?.map(excludeType =>
						this.compileFacadeExcludeType(excludeType, facade.name, factoryTypeName)
					)
				});
			}
		}

		for (const { factory, facadeName, excludeTypes } of resolved) {
			factory.useFacade(facadeName, excludeTypes);
			this._activatedFacades.push({ factory, facadeName });
		}
	}

	/**
	 * Deactivate the facades this engine activated.
	 * @internal
	 */
	private deactivateFacades(): void {
		for (const { factory, facadeName } of this._activatedFacades) {
			factory.unuseFacade(facadeName);
		}
		this._activatedFacades = [];
	}

	/**
	 * Release the component instances and registrations made during start.
	 * @internal
	 */
	private releaseInstances(): void {
		this._context.componentInstances = [];
		this._context.registeredInstances = {};
	}

	/**
	 * Compile an exclude pattern from the facade configuration.
	 * @param excludeType The pattern from the configuration.
	 * @param facadeName The facade the pattern belongs to, used to report where it came from.
	 * @param factoryTypeName The factory the facade applies to, used to report where it came from.
	 * @returns The compiled pattern.
	 * @throws GeneralError if the pattern is not a valid regular expression.
	 * @internal
	 */
	private compileFacadeExcludeType(
		excludeType: string,
		facadeName: string,
		factoryTypeName: string
	): RegExp {
		try {
			return new RegExp(excludeType);
		} catch (err) {
			throw new GeneralError(
				EngineCore.CLASS_NAME,
				"facadeExcludeTypeInvalid",
				{
					excludeType,
					facadeName,
					factoryTypeName
				},
				BaseError.fromError(err)
			);
		}
	}

	/**
	 * Initialise the context ID handlers.
	 * @internal
	 */
	private initialiseContextIdHandlers(): void {
		for (const contextIdKey of this._contextIdKeys) {
			const handlerType: string | undefined = this.getRegisteredInstanceTypeOptional(
				"contextIdHandlerComponent",
				contextIdKey.componentFeatures
			);
			if (Is.stringValue(handlerType)) {
				const handler = ComponentFactory.get<IContextIdHandler>(handlerType);
				ContextIdHandlerFactory.register(contextIdKey.key, () => handler);
			}
		}
	}
}
