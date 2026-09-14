// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { FacadeFactory } from "@twin.org/core";
import { EngineCore } from "@twin.org/engine-core";
import type { IEngineCoreContext } from "@twin.org/engine-models";
import { TracingFacade } from "@twin.org/tracing-facades";
import { initialiseFacade } from "../src/components/facade.js";
import type { FacadeConfig } from "../src/models/config/facadeConfig.js";
import type { IEngineConfig } from "../src/models/IEngineConfig.js";
import { FacadeType } from "../src/models/types/facadeType.js";
import { EngineTypeHelper } from "../src/utils/engineTypeHelper.js";

function makeEngineCore(silentLoggingFor?: string[]): EngineCore<IEngineConfig> {
	return new EngineCore<IEngineConfig>({
		config: {
			silent: true,
			types: {},
			silentComponents: { logging: silentLoggingFor }
		}
	});
}

function makeContext(engineCore: EngineCore<IEngineConfig>): IEngineCoreContext<IEngineConfig> {
	return {
		config: engineCore.getConfig(),
		state: {},
		stateDirty: false,
		registeredInstances: {},
		componentInstances: []
	};
}

describe("initialiseFacade", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("stores the instance in the facade factory", () => {
		const engineCore = makeEngineCore();
		const result = initialiseFacade(engineCore, makeContext(engineCore), {
			type: FacadeType.Tracing
		});

		expect(result.factory).toBe(FacadeFactory);
	});

	test("names the tracing facade instance type", () => {
		const engineCore = makeEngineCore();
		const result = initialiseFacade(engineCore, makeContext(engineCore), {
			type: FacadeType.Tracing
		});

		expect(result.instanceTypeName).toEqual("tracing-facade");
	});

	test("creates a tracing facade", () => {
		const engineCore = makeEngineCore();
		const instanceConfig: FacadeConfig = { type: FacadeType.Tracing };
		const result = initialiseFacade(engineCore, makeContext(engineCore), instanceConfig);

		expect(result.createComponent?.(instanceConfig)).toBeInstanceOf(TracingFacade);
	});

	test("wires the registered tracing and logging component types", () => {
		const engineCore = makeEngineCore();
		vi.spyOn(engineCore, "getRegisteredInstanceTypeOptional").mockReturnValue("tracing-service");
		vi.spyOn(engineCore, "getRegisteredSilencedType").mockReturnValue("logging-service");
		const mergeConfig = vi.spyOn(EngineTypeHelper, "mergeConfig");

		const instanceConfig: FacadeConfig = { type: FacadeType.Tracing };
		initialiseFacade(engineCore, makeContext(engineCore), instanceConfig).createComponent?.(
			instanceConfig
		);

		expect(engineCore.getRegisteredInstanceTypeOptional).toHaveBeenCalledWith("tracingComponent");
		expect(engineCore.getRegisteredSilencedType).toHaveBeenCalledWith("logging", "TracingFacade");
		expect(mergeConfig).toHaveBeenCalledWith(
			{ tracingComponentType: "tracing-service", loggingComponentType: "logging-service" },
			undefined
		);
	});

	test("lets the instance options override the wired component types", () => {
		const engineCore = makeEngineCore();
		vi.spyOn(engineCore, "getRegisteredInstanceTypeOptional").mockReturnValue("tracing-service");
		vi.spyOn(engineCore, "getRegisteredSilencedType").mockReturnValue("logging-service");
		const mergeConfig = vi.spyOn(EngineTypeHelper, "mergeConfig");

		const instanceConfig: FacadeConfig = {
			type: FacadeType.Tracing,
			options: { tracingComponentType: "custom-tracing" }
		};
		initialiseFacade(engineCore, makeContext(engineCore), instanceConfig).createComponent?.(
			instanceConfig
		);

		// The wired defaults come first, so the instance options take precedence over them.
		expect(mergeConfig).toHaveBeenCalledWith(
			{ tracingComponentType: "tracing-service", loggingComponentType: "logging-service" },
			{ tracingComponentType: "custom-tracing" }
		);
		expect(mergeConfig.mock.results[0].value).toEqual({
			tracingComponentType: "custom-tracing",
			loggingComponentType: "logging-service"
		});
	});

	test("leaves the logging component type unset when the facade is silenced", () => {
		const engineCore = makeEngineCore(["TracingFacade"]);
		vi.spyOn(engineCore, "getRegisteredInstanceTypeOptional").mockReturnValue("tracing-service");
		const mergeConfig = vi.spyOn(EngineTypeHelper, "mergeConfig");

		const instanceConfig: FacadeConfig = { type: FacadeType.Tracing };
		initialiseFacade(engineCore, makeContext(engineCore), instanceConfig).createComponent?.(
			instanceConfig
		);

		expect(mergeConfig.mock.calls[0][0]).toEqual({
			tracingComponentType: "tracing-service",
			loggingComponentType: undefined
		});
	});

	test("returns no instance for an unknown facade type", () => {
		const engineCore = makeEngineCore();
		const result = initialiseFacade(engineCore, makeContext(engineCore), {
			type: "unknown-facade"
		} as unknown as FacadeConfig);

		expect(result.instanceTypeName).toBeUndefined();
		expect(result.createComponent).toBeUndefined();
		expect(result.factory).toBe(FacadeFactory);
	});
});
