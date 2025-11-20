// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { TenantIdContextIdHandler } from "@twin.org/api-tenant-processor";
import type { IContextIdHandler } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { DidContextIdHandler } from "@twin.org/identity-models";
import { nameofKebabCase } from "@twin.org/nameof";
import type { ContextIdHandlerComponentConfig } from "../models/config/contextIdHandlerComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { ContextIdHandlerComponentType } from "../models/types/contextIdHandlerComponentType.js";

/**
 * Initialise the context id handler component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseContextIdHandlerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ContextIdHandlerComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IContextIdHandler | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === ContextIdHandlerComponentType.Did) {
		component = new DidContextIdHandler();
		instanceType = nameofKebabCase(DidContextIdHandler);
	} else if (instanceConfig.type === ContextIdHandlerComponentType.Tenant) {
		component = new TenantIdContextIdHandler();
		instanceType = nameofKebabCase(TenantIdContextIdHandler);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
