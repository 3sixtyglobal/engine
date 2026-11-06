// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { Factory } from "@3sixty/core";
import type { IEngineCoreTypeBaseConfig } from "./config/IEngineCoreTypeBaseConfig.js";
import type { IEngineCore } from "./IEngineCore.js";
import type { IEngineCoreContext } from "./IEngineCoreContext.js";
import type { IEngineTypeInitialiserReturn } from "./IEngineTypeInitialiserReturn.js";

/**
 * Method definition for the engine type initialiser.
 */
export type EngineTypeInitialiser<
	T extends IEngineCoreTypeBaseConfig = IEngineCoreTypeBaseConfig,
	F = Factory<unknown>
> = (
	engineCore: IEngineCore,
	context: IEngineCoreContext,
	instanceConfig: T
) => IEngineTypeInitialiserReturn<T, F>;
