// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute, ISocketRoute } from "@3sixty/api-models";

/**
 * Interface describing the engine server methods.
 */
export interface IEngineServer {
	/**
	 * Add a REST route generator.
	 * @param type The type to add the generator for.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	addRestRouteGenerator(type: string, module: string, method: string): void;

	/**
	 * Add a socket route generator.
	 * @param type The type to add the generator for.
	 * @param module The module containing the generator.
	 * @param method The method to call on the module.
	 */
	addSocketRouteGenerator(type: string, module: string, method: string): void;

	/**
	 * Get the built REST routes.
	 * @returns The REST routes.
	 */
	getRestRoutes(): IRestRoute[];

	/**
	 * Get the built socket routes.
	 * @returns The socket routes.
	 */
	getSocketRoutes(): ISocketRoute[];

	/**
	 * Start the engine server.
	 * @param engineReady Called once the engine has started and the routes are built, before the web server accepts requests.
	 * @returns A promise that resolves when the server has started and is ready to accept requests.
	 */
	start(engineReady?: () => Promise<void>): Promise<void>;

	/**
	 * Stop the engine server.
	 * @returns A promise that resolves when the server has stopped and all connections are closed.
	 */
	stop(): Promise<void>;
}
