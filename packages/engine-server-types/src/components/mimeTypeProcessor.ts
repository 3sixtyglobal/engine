// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { MimeTypeProcessorFactory } from "@twin.org/api-models";
import { JwtMimeTypeProcessor } from "@twin.org/api-processors";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameofKebabCase } from "@twin.org/nameof";
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
): EngineTypeInitialiserReturn<MimeTypeProcessorConfig, typeof MimeTypeProcessorFactory> {
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
