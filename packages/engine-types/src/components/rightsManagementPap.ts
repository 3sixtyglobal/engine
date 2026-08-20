// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory } from "@twin.org/core";
import type { IComponent } from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	initSchema as initSchemaRightsManagementPap,
	type OdrlPolicy,
	PolicyAdministrationPointService
} from "@twin.org/rights-management-pap-service";
import { PolicyAdministrationPointRestClient } from "@twin.org/rights-management-rest-client";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { RightsManagementPapComponentConfig } from "../models/config/rightsManagementPapComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPapComponentType } from "../models/types/rightsManagementPapComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management PAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPapComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPapComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initSchemaRightsManagementPap();

			initialiseEntityStorageConnector(
				engineCore,
				context,
				createConfig.options?.odrlPolicyEntityStorageType,
				nameof<OdrlPolicy>(),
				ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
					ContextIdKeys.Node,
					ContextIdKeys.Tenant
				])
			);
			return new PolicyAdministrationPointService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(PolicyAdministrationPointService)
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(PolicyAdministrationPointService);
	} else if (instanceConfig.type === RightsManagementPapComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PolicyAdministrationPointRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(PolicyAdministrationPointRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}
