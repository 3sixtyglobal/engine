// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEventBusServiceConstructorOptions } from "@3sixty/event-bus-service";
import type { IEventBusSocketClientConstructorOptions } from "@3sixty/event-bus-socket-client";
import type { EventBusComponentType } from "../types/eventBusComponentType.js";

/**
 * Event bus storage component config types.
 */
export type EventBusComponentConfig =
	| {
			type: typeof EventBusComponentType.Service;
			options?: IEventBusServiceConstructorOptions;
	  }
	| {
			type: typeof EventBusComponentType.SocketClient;
			options: IEventBusSocketClientConstructorOptions;
	  };
