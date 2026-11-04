// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import { FeatureRestClient } from "@3sixty/api-auth-rest-client";
import { FeatureService } from "@3sixty/api-auth-service";
import { ComponentFactory } from "@3sixty/core";
import type { IEngineCore, IEngineCoreContext } from "@3sixty/engine-models";
import { initialiseFeatureComponent } from "../../src/components/feature.js";
import type { IEngineServerConfig } from "../../src/models/IEngineServerConfig.js";
import { FeatureComponentType } from "../../src/models/types/featureComponentType.js";

const engineCore = {
	getRegisteredInstanceType: vi.fn(() => "authorization")
} as unknown as IEngineCore<IEngineServerConfig>;
const context = {} as IEngineCoreContext<IEngineServerConfig>;

describe("initialiseFeatureComponent", () => {
	beforeEach(() => {
		ComponentFactory.register("authorization", () => ({ className: () => "Authorization" }));
	});

	afterEach(() => {
		ComponentFactory.unregister("authorization");
	});

	test("creates the feature service with the registered authorization component", () => {
		const instanceConfig = { type: FeatureComponentType.Service };
		const result = initialiseFeatureComponent(engineCore, context, instanceConfig);

		expect(result.instanceTypeName).toEqual("feature-service");
		expect(result.factory).toBe(ComponentFactory);
		expect(result.createComponent?.(instanceConfig)).toBeInstanceOf(FeatureService);
		expect(engineCore.getRegisteredInstanceType).toHaveBeenCalledWith("authorizationComponent");
	});

	test("creates the feature REST client", () => {
		const instanceConfig = {
			type: FeatureComponentType.RestClient,
			options: { endpoint: "http://localhost:8080" }
		};
		const result = initialiseFeatureComponent(engineCore, context, instanceConfig);

		expect(result.instanceTypeName).toEqual("feature-rest-client");
		expect(result.createComponent?.(instanceConfig)).toBeInstanceOf(FeatureRestClient);
	});
});
