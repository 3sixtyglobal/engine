// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

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
	 * Start the engine server.
	 * @returns A promise that resolves when the server has started and is ready to accept requests.
	 */
	start(): Promise<void>;

	/**
	 * Stop the engine server.
	 * @returns A promise that resolves when the server has stopped and all connections are closed.
	 */
	stop(): Promise<void>;
}
