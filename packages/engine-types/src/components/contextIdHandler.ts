// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { TenantIdContextIdHandler } from "@twin.org/api-tenant-processor";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
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
export function initialiseContextIdHandlerComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: ContextIdHandlerComponentConfig
): EngineTypeInitialiserReturn<ContextIdHandlerComponentConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === ContextIdHandlerComponentType.Did) {
		createComponent = (createConfig: typeof instanceConfig) => new DidContextIdHandler();
		instanceTypeName = nameofKebabCase(DidContextIdHandler);
	} else if (instanceConfig.type === ContextIdHandlerComponentType.Tenant) {
		createComponent = (createConfig: typeof instanceConfig) => new TenantIdContextIdHandler();
		instanceTypeName = nameofKebabCase(TenantIdContextIdHandler);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
