// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { MimeTypeProcessorFactory } from "@3sixty/api-models";
import { JwtMimeTypeProcessor } from "@3sixty/api-processors";
import type {
	IEngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameofKebabCase } from "@3sixty/nameof";
import type { MimeTypeProcessorConfig } from "../models/config/mimeTypeProcessorConfig.js";
import type { IEngineServerConfig } from "../models/IEngineServerConfig.js";
import { MimeTypeProcessorType } from "../models/types/mimeTypeProcessorType.js";

/**
 * Initialise the mime type processor.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseMimeTypeProcessorComponent(
	engineCore: IEngineCore<IEngineServerConfig>,
	context: IEngineCoreContext<IEngineServerConfig>,
	instanceConfig: MimeTypeProcessorConfig
): IEngineTypeInitialiserReturn<MimeTypeProcessorConfig, typeof MimeTypeProcessorFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === MimeTypeProcessorType.Jwt) {
		createComponent = (createConfig: typeof instanceConfig) => new JwtMimeTypeProcessor();
		instanceTypeName = nameofKebabCase(JwtMimeTypeProcessor);
	}

	return {
		createComponent,
		instanceTypeName,
		factory: MimeTypeProcessorFactory
	};
}
