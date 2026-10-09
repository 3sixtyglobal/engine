// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@3sixty/core";
import type { IEngineServerConfig } from "@3sixty/engine-server-types";
import serverRestRouteGenerators from "../data/serverRestRouteGenerators.json" with { type: "json" };
import serverSocketRouteGenerators from "../data/serverSocketRouteGenerators.json" with { type: "json" };

/**
 * Adds the rest paths to the server config if not already set.
 * @param serverConfig The server config.
 */
export function addDefaultRestPaths(serverConfig: IEngineServerConfig): void {
	for (const routeGenerator of serverRestRouteGenerators) {
		const types = serverConfig.types[routeGenerator.type];

		if (
			Is.arrayValue(types) &&
			!Is.stringValue(types[0].restPath) &&
			Is.string(routeGenerator.defaultPath)
		) {
			types[0].restPath = routeGenerator.defaultPath;
		}
	}
}

/**
 * Adds the socket paths to the server config.
 * @param serverConfig The server config.
 */
export function addDefaultSocketPaths(serverConfig: IEngineServerConfig): void {
	for (const routeGenerator of serverSocketRouteGenerators) {
		const types = serverConfig.types[routeGenerator.type];

		if (
			Is.arrayValue(types) &&
			!Is.stringValue(types[0].socketPath) &&
			Is.stringValue(routeGenerator.defaultPath)
		) {
			types[0].socketPath = routeGenerator.defaultPath;
		}
	}
}
