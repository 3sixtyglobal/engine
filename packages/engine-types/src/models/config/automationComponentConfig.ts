// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@3sixty/api-models";
import type { IAutomationServiceConstructorOptions } from "@3sixty/automation-service";
import type { AutomationComponentType } from "../types/automationComponentType.js";

/**
 * Automation component configuration.
 */
export type AutomationComponentConfig =
	| {
			type: typeof AutomationComponentType.Service;
			options?: IAutomationServiceConstructorOptions;
	  }
	| {
			type: typeof AutomationComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
