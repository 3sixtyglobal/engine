// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { TenantIdContextIdHandler } from "@3sixty/api-tenant-processor";
import { ComponentFactory, type IComponent } from "@3sixty/core";
import type {
	IEngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { DidContextIdHandler } from "@3sixty/identity-models";
import { nameofKebabCase } from "@3sixty/nameof";
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
): IEngineTypeInitialiserReturn<ContextIdHandlerComponentConfig, typeof ComponentFactory> {
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
