// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute, ISocketRoute, IWebServer } from "@twin.org/api-models";
import {
	MimeTypeProcessorFactory,
	RestRouteProcessorFactory,
	SocketRouteProcessorFactory
} from "@twin.org/api-models";
import { FastifyWebServer } from "@twin.org/api-server-fastify";
import { Guards, Is, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreTypeConfig, IEngineServer } from "@twin.org/engine-models";
import {
	RestRouteProcessorType,
	SocketRouteProcessorType,
	type IEngineServerConfig
} from "@twin.org/engine-server-types";
import { ModuleHelper } from "@twin.org/modules";
import { nameof } from "@twin.org/nameof";
import serverRestRouteGenerators from "./data/serverRestRouteGenerators.json";
import serverSocketRouteGenerators from "./data/serverSocketRouteGenerators.json";
import serverTypeInitialisers from "./data/serverTypeInitialisers.json";

/**
 * Server for the engine.
 */
export class EngineServer<T extends IEngineServerConfig = IEngineServerConfig>
	implements IEngineServer
{
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<EngineServer>();

	/**
	 * The engine.
	 * @internal
	 */
	private readonly _engineCore: IEngineCore<T>;

	/**
	 * The REST route generators.
	 * @internal
	 */
	private readonly _restRouteGenerators: {
		type: string;
		module: string;
		method: string;
	}[];

	/**
	 * The socket route generators.
	 * @internal
	 */
	private readonly _socketRouteGenerators: {
		type: string;
		module: string;
		method: string;
	}[];

	/**
	 * The web server.
	 * @internal
	 */
	private _webServer?: IWebServer<unknown>;

	/**
	 * The REST routes for the application.
	 * @internal
	 */
	private _restRoutes: IRestRoute[];

	/**
	 * The Socket routes for the application.
	 * @internal
	 */
	private _socketRoutes: ISocketRoute[];

	/**
	 * Create a new instance of EngineServer.
	 * @param options The options for the engine.
	 * @param options.engineCore The engine core to serve from.
	 */
	constructor(options: { engineCore: IEngineCore<T> }) {
		Guards.object(EngineServer.CLASS_NAME, nameof(options), options);
		Guards.object(EngineServer.CLASS_NAME, nameof(options.engineCore), options.engineCore);

		this._engineCore = options.engineCore;
		this._restRouteGenerators = [];
		this._socketRouteGenerators = [];
		this._restRoutes = [];
		this._socketRoutes = [];

		const coreConfig = this._engineCore.getConfig();

		if (!Is.arrayValue(coreConfig.types.restRouteProcessor)) {
			coreConfig.types.restRouteProcessor = [];

			if (!coreConfig.silent) {
				coreConfig.types.restRouteProcessor.push({
					type: RestRouteProcessorType.Logging,
					options: {
						config: {
							includeBody: coreConfig.debug
						}
					}
				});
			}
			coreConfig.types.restRouteProcessor.push({
				type: RestRouteProcessorType.RestRoute,
				options: {
					config: {
						includeErrorStack: coreConfig.debug
					}
				}
			});
		}

		if (!Is.arrayValue(coreConfig.types.socketRouteProcessor)) {
			coreConfig.types.socketRouteProcessor = [];

			if (!coreConfig.silent) {
				coreConfig.types.socketRouteProcessor.push({
					type: SocketRouteProcessorType.Logging,
					options: {
						config: {
							includeBody: coreConfig.debug
						}
					}
				});
			}
			coreConfig.types.socketRouteProcessor.push({
				type: SocketRouteProcessorType.SocketRoute,
				options: {
					config: {
						includeErrorStack: coreConfig.debug
					}
				}
			});
		}

		this.addServerTypeInitialisers();
		this.addServerRestRouteGenerators();
		this.addServerSocketRouteGenerators();
	}

	/**
	 * Add a REST route generator.
	 * @param type The type to add the generator for.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	public addRestRouteGenerator(type: string, module: string, method: string): void {
		Guards.stringValue(EngineServer.CLASS_NAME, nameof(type), type);
		Guards.stringValue(EngineServer.CLASS_NAME, nameof(module), module);
		Guards.stringValue(EngineServer.CLASS_NAME, nameof(method), method);

		const currentIndex = this._restRouteGenerators.findIndex(r => r.type === type);
		if (currentIndex >= 0) {
			this._restRouteGenerators[currentIndex].module = module;
			this._restRouteGenerators[currentIndex].method = method;
		} else {
			this._restRouteGenerators.push({
				type,
				module,
				method
			});
		}
	}

	/**
	 * Add a socket route generator.
	 * @param type The type to add the generator for.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	public addSocketRouteGenerator(type: string, module: string, method: string): void {
		Guards.stringValue(EngineServer.CLASS_NAME, nameof(type), type);
		Guards.stringValue(EngineServer.CLASS_NAME, nameof(module), module);
		Guards.stringValue(EngineServer.CLASS_NAME, nameof(method), method);

		const currentIndex = this._socketRouteGenerators.findIndex(s => s.type === type);
		if (currentIndex >= 0) {
			this._socketRouteGenerators[currentIndex].module = module;
			this._socketRouteGenerators[currentIndex].method = method;
		} else {
			this._socketRouteGenerators.push({
				type,
				module,
				method
			});
		}
	}

	/**
	 * Get the built REST routes.
	 * @returns The REST routes.
	 */
	public getRestRoutes(): IRestRoute[] {
		return this._restRoutes;
	}

	/**
	 * Get the built socket routes.
	 * @returns The socket routes.
	 */
	public getSocketRoutes(): ISocketRoute[] {
		return this._socketRoutes;
	}

	/**
	 * Start the engine server.
	 * @returns True if the start was successful.
	 */
	public async start(): Promise<boolean> {
		const canContinue = await this._engineCore.start();

		if (canContinue) {
			await this.startWebServer();
		}

		return canContinue;
	}

	/**
	 * Stop the engine server.
	 * @returns Nothing.
	 */
	public async stop(): Promise<void> {
		if (this._webServer) {
			await this._webServer.stop();
			this._webServer = undefined;
		}

		await this._engineCore.stop();
	}

	/**
	 * Starts the web server.
	 * @internal
	 */
	private async startWebServer(): Promise<void> {
		this._restRoutes = await this.buildRestRoutes();
		this._socketRoutes = await this.buildSocketRoutes();
		const restRouteProcessors = RestRouteProcessorFactory.names().map(n =>
			RestRouteProcessorFactory.get(n)
		);
		const socketRouteProcessors = SocketRouteProcessorFactory.names().map(n =>
			SocketRouteProcessorFactory.get(n)
		);
		const mimeTypeProcessors = MimeTypeProcessorFactory.names().map(n =>
			MimeTypeProcessorFactory.get(n)
		);

		const coreConfig = this._engineCore.getConfig();
		const loggingComponentType = coreConfig.silent
			? undefined
			: this._engineCore.getRegisteredInstanceType("loggingComponent");

		this._webServer = new FastifyWebServer({
			loggingComponentType,
			mimeTypeProcessors
		});

		await this._webServer.build(
			restRouteProcessors,
			this._restRoutes,
			socketRouteProcessors,
			this._socketRoutes,
			coreConfig.web
		);
		await this._webServer.start();
	}

	/**
	 * The REST routes for the application.
	 * @returns The REST routes for the application.
	 * @internal
	 */
	private async buildRestRoutes(): Promise<IRestRoute[]> {
		const routes: IRestRoute[] = [];

		for (const { type, module, method } of this._restRouteGenerators) {
			await this.initialiseRestTypeRoute(routes, type, module, method);
		}

		return routes;
	}

	/**
	 * The socket routes for the application.
	 * @returns The socket routes for the application.
	 * @internal
	 */
	private async buildSocketRoutes(): Promise<ISocketRoute[]> {
		const routes: ISocketRoute[] = [];

		for (const { type, module, method } of this._socketRouteGenerators) {
			await this.initialiseSocketTypeRoute(routes, type, module, method);
		}

		return routes;
	}

	/**
	 * Initialise the rest routes from connector.
	 * @param routes The routes to add to.
	 * @param typeKey The key for the default types.
	 * @param generateRoutes The function to generate the routes.
	 * @internal
	 */
	private async initialiseRestTypeRoute(
		routes: IRestRoute[],
		typeKey: string,
		module: string,
		method: string
	): Promise<void> {
		const typeConfig: IEngineCoreTypeConfig[] | undefined = this._engineCore.getTypeConfig(typeKey);

		if (Is.arrayValue(typeConfig)) {
			const generateRoutes = await ModuleHelper.getModuleEntry<
				(baseRouteName: string, componentName: string, options?: unknown) => IRestRoute[]
			>(module, method);

			for (let i = 0; i < typeConfig.length; i++) {
				const restPath = typeConfig[i].restPath;
				const restOptions = typeConfig[i].restOptions;

				if (Is.string(restPath)) {
					const serviceType =
						typeConfig[i].overrideInstanceType ??
						this._engineCore.getRegisteredInstanceType(typeKey);
					if (Is.stringValue(serviceType)) {
						const generatedRoutes = generateRoutes(restPath, serviceType, restOptions);
						for (const route of generatedRoutes) {
							// Don't strip trailing slashes from the root path.
							if (Is.stringValue(route.path) && route.path.length > 1) {
								route.path = StringHelper.trimTrailingSlashes(route.path);
							}
						}
						routes.push(...generatedRoutes);
					}
				}
			}
		}
	}

	/**
	 * Initialise the socket routes from connector.
	 * @param routes The routes to add to.
	 * @param typeKey The key for the default types.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 * @internal
	 */
	private async initialiseSocketTypeRoute(
		routes: ISocketRoute[],
		typeKey: string,
		module: string,
		method: string
	): Promise<void> {
		const typeConfig: IEngineCoreTypeConfig[] | undefined = this._engineCore.getTypeConfig(typeKey);

		if (Is.arrayValue(typeConfig)) {
			const generateRoutes = await ModuleHelper.getModuleEntry<
				(baseRouteName: string, componentName: string, options?: unknown) => ISocketRoute[]
			>(module, method);

			for (let i = 0; i < typeConfig.length; i++) {
				const socketPath = typeConfig[i].socketPath;
				const socketOptions = typeConfig[i].socketOptions;
				if (Is.string(socketPath)) {
					const serviceType =
						typeConfig[i].overrideInstanceType ??
						this._engineCore.getRegisteredInstanceType(typeKey);
					if (Is.stringValue(serviceType)) {
						routes.push(...generateRoutes(socketPath, serviceType, socketOptions));
					}
				}
			}
		}
	}

	/**
	 * Add the server type initializers.
	 * @internal
	 */
	private addServerTypeInitialisers(): void {
		for (const initializer of serverTypeInitialisers) {
			this._engineCore.addTypeInitialiser(initializer.type, initializer.module, initializer.method);
		}
	}

	/**
	 * Add the server REST route generators.
	 * @internal
	 */
	private addServerRestRouteGenerators(): void {
		for (const generator of serverRestRouteGenerators) {
			this.addRestRouteGenerator(generator.type, generator.module, generator.method);
		}
	}

	/**
	 * Add the server socket route generators.
	 * @internal
	 */
	private addServerSocketRouteGenerators(): void {
		for (const generator of serverSocketRouteGenerators) {
			this.addSocketRouteGenerator(generator.type, generator.module, generator.method);
		}
	}
}
