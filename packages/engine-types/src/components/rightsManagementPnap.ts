// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ContextIdHelper, ContextIdKeys } from "@3sixty/context";
import type { IComponent } from "@3sixty/core";
import { ComponentFactory } from "@3sixty/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreContext
} from "@3sixty/engine-models";
import { nameof, nameofKebabCase } from "@3sixty/nameof";
import {
	type PolicyNegotiation,
	PolicyNegotiationAdminPointService,
	initSchema as initSchemaRightsManagementPnap
} from "@3sixty/rights-management-pnp-service";
import { PolicyNegotiationAdminPointRestClient } from "@3sixty/rights-management-rest-client";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { RightsManagementPnapComponentConfig } from "../models/config/rightsManagementPnapComponentConfig.js";
import type { IEngineConfig } from "../models/IEngineConfig.js";
import { RightsManagementPnapComponentType } from "../models/types/rightsManagementPnapComponentType.js";
import { EngineTypeHelper } from "../utils/engineTypeHelper.js";

/**
 * Initialise the rights management PNAP component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @returns The instance created and the factory for it.
 */
export function initialiseRightsManagementPnapComponent(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	instanceConfig: RightsManagementPnapComponentConfig
): EngineTypeInitialiserReturn<typeof instanceConfig, typeof ComponentFactory> {
	let createComponent;
	let instanceTypeName;

	if (instanceConfig.type === RightsManagementPnapComponentType.Service) {
		createComponent = (createConfig: typeof instanceConfig) => {
			initialisePnapStorage(
				engineCore,
				context,
				createConfig.options?.policyNegotiationEntityStorageType
			);

			return new PolicyNegotiationAdminPointService(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(
					{
						loggingComponentType: engineCore.getRegisteredSilencedType(
							"logging",
							nameof(PolicyNegotiationAdminPointService)
						),
						policyInformationPointComponentType: engineCore.getRegisteredInstanceType(
							"rightsManagementPipComponent"
						)
					},
					createConfig.options
				)
			);
		};
		instanceTypeName = nameofKebabCase(PolicyNegotiationAdminPointService);
	} else if (instanceConfig.type === RightsManagementPnapComponentType.RestClient) {
		createComponent = (createConfig: typeof instanceConfig) =>
			new PolicyNegotiationAdminPointRestClient(
				EngineTypeHelper.mergeConfig<(typeof instanceConfig)["options"]>(createConfig.options)
			);
		instanceTypeName = nameofKebabCase(PolicyNegotiationAdminPointRestClient);
	}

	return {
		createComponent: createComponent as (createConfig: typeof instanceConfig) => IComponent,
		instanceTypeName,
		factory: ComponentFactory
	};
}

/**
 * Initialises the storage for the Policy Negotiation Admin Point (PNAP) component.
 * @param engineCore The engine core.
 * @param context The context for the engine.
 * @param policyNegotiationEntityStorageType The type of the policy negotiation entity storage.
 */
export function initialisePnapStorage(
	engineCore: IEngineCore<IEngineConfig>,
	context: IEngineCoreContext<IEngineConfig>,
	policyNegotiationEntityStorageType: string | undefined
): void {
	initSchemaRightsManagementPnap();

	const partitionContextIds = ContextIdHelper.pickKeysFromAvailable(engineCore.getContextIdKeys(), [
		ContextIdKeys.Node,
		ContextIdKeys.Tenant
	]);

	initialiseEntityStorageConnector(
		engineCore,
		context,
		policyNegotiationEntityStorageType,
		nameof<PolicyNegotiation>(),
		partitionContextIds
	);
}
