// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@twin.org/context";
import { ComponentFactory, type IComponent } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import type { IPolicyAdministrationPointComponent } from "@twin.org/rights-management-models";
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

/**
 * Initialise the rights management PAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export async function initialiseRightsManagementPapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPapComponentConfig
): Promise<{
	instanceType?: string;
	factory?: typeof ComponentFactory;
	component?: IComponent;
}> {
	let component: IPolicyAdministrationPointComponent | undefined;
	let instanceType: string | undefined;

	if (instanceConfig.type === RightsManagementPapComponentType.Service) {
		initSchemaRightsManagementPap();

		initialiseEntityStorageConnector(
			engineCore,
			context,
			instanceConfig.options?.odrlPolicyEntityStorageType,
			nameof<OdrlPolicy>(),
			ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
				ContextIdKeys.Node,
				ContextIdKeys.Tenant
			])
		);

		component = new PolicyAdministrationPointService({
			loggingComponentType: engineCore.getRegisteredInstanceType("loggingComponent"),
			...instanceConfig.options
		});
		instanceType = nameofKebabCase(PolicyAdministrationPointService);
	} else if (instanceConfig.type === RightsManagementPapComponentType.RestClient) {
		component = new PolicyAdministrationPointRestClient(instanceConfig.options);
		instanceType = nameofKebabCase(PolicyAdministrationPointRestClient);
	}

	return {
		component,
		instanceType,
		factory: ComponentFactory
	};
}
