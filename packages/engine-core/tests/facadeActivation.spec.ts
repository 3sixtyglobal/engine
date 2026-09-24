// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	ComponentFactory,
	FacadeFactory,
	Factory,
	I18n,
	Is,
	type IComponent,
	type IFacade
} from "@twin.org/core";
import type {
	EngineTypeInitialiserReturn,
	IEngineCore,
	IEngineCoreConfig,
	IEngineCoreTypeConfig,
	IEngineFacadeConfig
} from "@twin.org/engine-models";
import { ModuleHelper } from "@twin.org/modules";
import locales from "../locales/en.json" with { type: "json" };
import { EngineCore } from "../src/engineCore.js";
import { MemoryStateStorage } from "../src/storage/memoryStateStorage.js";

const PIPELINE_MODULE = "engine-core-facade-pipeline-tests";

/**
 * Component whose method reports whether the call passed through a facade.
 */
class TestComponent implements IComponent {
	public className(): string {
		return "TestComponent";
	}

	public work(): string {
		return "raw";
	}
}

/**
 * Component which resolves its dependency while it is being constructed, so the instance it holds
 * only carries a facade if the facade was activated before the component was constructed.
 */
class DependentComponent implements IComponent {
	private readonly _dependency: TestComponent;

	constructor(dependencyType: string) {
		this._dependency = ComponentFactory.get<TestComponent>(dependencyType);
	}

	public className(): string {
		return "DependentComponent";
	}

	public dependencyWork(): string {
		return this._dependency.work();
	}
}

/**
 * Component which records the instance type of its dependency without resolving it, which is how
 * a component refers to one that has not been constructed yet.
 */
class NamingComponent implements IComponent {
	private readonly _dependencyType: string;

	constructor(dependencyType: string) {
		this._dependencyType = dependencyType;
	}

	public className(): string {
		return "NamingComponent";
	}

	public dependencyType(): string {
		return this._dependencyType;
	}
}

/**
 * Facade which marks every method call it intercepts.
 */
class MarkingFacade implements IFacade, IComponent {
	private readonly _marker: string;

	constructor(marker?: string) {
		this._marker = marker ?? "marked";
	}

	public className(): string {
		return "MarkingFacade";
	}

	public wrap(target: unknown): unknown {
		return new Proxy(target as { [key: string]: unknown }, {
			get: (t, prop, receiver): unknown => {
				const value = Reflect.get(t, prop, receiver);

				if (!Is.function(value)) {
					return value;
				}

				return (...args: unknown[]): unknown => {
					const result = (value as (...a: unknown[]) => unknown).apply(t, args);

					return Is.string(result) ? `${this._marker}:${result}` : result;
				};
			}
		});
	}
}

/**
 * Initialisers exposed as a module, so the engine can resolve and construct them through the
 * type initialiser pipeline rather than the components being registered directly.
 */
const pipelineModule = {
	initialisePipelineFacade: (): EngineTypeInitialiserReturn<
		IEngineCoreTypeConfig,
		typeof FacadeFactory
	> => ({
		createComponent: () => new MarkingFacade(),
		instanceTypeName: "pipeline-facade",
		factory: FacadeFactory
	}),
	initialisePipelineComponent: (): EngineTypeInitialiserReturn<
		IEngineCoreTypeConfig,
		typeof ComponentFactory
	> => ({
		createComponent: () => new TestComponent(),
		instanceTypeName: "pipeline-component",
		factory: ComponentFactory
	}),
	initialisePipelineDependent: (
		engineCore: IEngineCore
	): EngineTypeInitialiserReturn<IEngineCoreTypeConfig, typeof ComponentFactory> => ({
		createComponent: () =>
			new DependentComponent(engineCore.getRegisteredInstanceType("pipelineComponent")),
		instanceTypeName: "pipeline-dependent",
		factory: ComponentFactory
	}),
	initialisePipelineNaming: (
		engineCore: IEngineCore
	): EngineTypeInitialiserReturn<IEngineCoreTypeConfig, typeof ComponentFactory> => ({
		createComponent: () =>
			new NamingComponent(engineCore.getRegisteredInstanceType("pipelineComponent")),
		instanceTypeName: "pipeline-naming",
		factory: ComponentFactory
	})
};

function makeEngine(facades?: { [factoryTypeName: string]: IEngineFacadeConfig[] }): EngineCore {
	return new EngineCore<IEngineCoreConfig>({
		config: { silent: true, types: {}, facades },
		stateStorage: new MemoryStateStorage()
	});
}

/**
 * Create an engine which runs its types through the initialiser pipeline, adding the initialisers
 * in the order they are listed rather than the order the types appear in the config.
 * @param types The types for the engine config.
 * @param facades The facades for the engine config.
 * @param initialisers The type initialisers, added in the order they are listed.
 * @returns The engine.
 */
function makePipelineEngine(
	types: { [type: string]: IEngineCoreTypeConfig[] },
	facades: { [factoryTypeName: string]: IEngineFacadeConfig[] } | undefined,
	initialisers: { type: string; method: string }[]
): EngineCore {
	return new EngineCore<IEngineCoreConfig>({
		config: { silent: true, types, facades },
		stateStorage: new MemoryStateStorage(),
		populateTypeInitialisers: engineCore => {
			for (const initialiser of initialisers) {
				engineCore.addTypeInitialiser(initialiser.type, PIPELINE_MODULE, initialiser.method);
			}
		}
	});
}

describe("EngineCore facades", () => {
	beforeAll(() => {
		I18n.addDictionary("en", locales);

		ModuleHelper.overrideImport(async moduleName => {
			if (moduleName === PIPELINE_MODULE) {
				return { module: pipelineModule, useDefault: false };
			}
			return { useDefault: true };
		});
	});

	afterAll(() => {
		ModuleHelper.overrideImport(async () => ({ useDefault: true }));
	});

	beforeEach(() => {
		FacadeFactory.clear();
		FacadeFactory.register("marking", () => new MarkingFacade());
		ComponentFactory.register("test-component", () => new TestComponent());
	});

	afterEach(async () => {
		for (const factoryTypeName of ["component", "facade-test-other", "facade-test-multi"]) {
			const factory = Factory.getFactory(factoryTypeName);
			for (const facadeName of ["marking", "inner", "pipeline-facade"]) {
				factory?.unuseFacade(facadeName);
			}
		}

		for (const instanceType of [
			"test-component",
			"kept-component",
			"pipeline-component",
			"pipeline-dependent",
			"pipeline-naming",
			"renamed-component"
		]) {
			if (ComponentFactory.hasName(instanceType)) {
				ComponentFactory.unregister(instanceType);
			}
		}

		Factory.getFactory("facade-test-multi")?.clear();
		FacadeFactory.clear();
	});

	test("wraps the instances of a factory named in the configuration", async () => {
		const engine = makeEngine({ component: [{ name: "marking" }] });
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("marked:raw");

		await engine.stop();
	});

	test("deactivates the facades when the engine is stopped", async () => {
		const engine = makeEngine({ component: [{ name: "marking" }] });
		await engine.start();
		await engine.stop();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");
	});

	test("leaves the instances of a factory which is not named", async () => {
		Factory.createFactory<IComponent>("facade-test-other");
		const engine = makeEngine({ "facade-test-other": [{ name: "marking" }] });
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");

		await engine.stop();
	});

	test("behaves as it does today with no facades configured", async () => {
		const engine = makeEngine();
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");

		await engine.stop();
	});

	test("wraps the instances of every factory named in the configuration", async () => {
		const other = Factory.createFactory<IComponent>("facade-test-multi");
		other.register("other-component", () => new TestComponent());

		const engine = makeEngine({
			component: [{ name: "marking" }],
			"facade-test-multi": [{ name: "marking" }]
		});
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("marked:raw");
		expect(other.get<TestComponent>("other-component").work()).toEqual("marked:raw");

		await engine.stop();
	});

	test("wraps with the facade listed first as the outermost", async () => {
		FacadeFactory.register("inner", () => new MarkingFacade("inner"));

		const engine = makeEngine({ component: [{ name: "marking" }, { name: "inner" }] });
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual(
			"marked:inner:raw"
		);

		await engine.stop();
	});

	test("fails to start when the facade is not registered", async () => {
		const engine = makeEngine({ component: [{ name: "missing" }] });

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeUnknown"
			})
		);
	});

	test("fails to start when the factory type name is not known", async () => {
		const engine = makeEngine({ "not-a-factory": [{ name: "marking" }] });

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeFactoryUnknown"
			})
		);
	});

	test("rejects a facade applied to the facade factory itself", async () => {
		const engine = makeEngine({ facade: [{ name: "marking" }] });

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeOnFacadeFactory"
			})
		);
	});

	test("leaves an excluded instance type unwrapped", async () => {
		const engine = makeEngine({
			component: [{ name: "marking", excludeTypes: ["test-component"] }]
		});
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");

		await engine.stop();
	});

	test("treats an exclude type as a regular expression", async () => {
		const engine = makeEngine({
			component: [{ name: "marking", excludeTypes: ["^test-.*nent$"] }]
		});
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");

		await engine.stop();
	});

	test("matches an exclude pattern anywhere in the instance type", async () => {
		const engine = makeEngine({ component: [{ name: "marking", excludeTypes: ["component"] }] });
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");

		await engine.stop();
	});

	test("keeps an instance wrapped when no exclude pattern matches it", async () => {
		const engine = makeEngine({ component: [{ name: "marking", excludeTypes: ["^other-"] }] });
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("marked:raw");

		await engine.stop();
	});

	test("only excludes the instance types matching one of the patterns", async () => {
		ComponentFactory.register("kept-component", () => new TestComponent());

		const engine = makeEngine({
			component: [{ name: "marking", excludeTypes: ["^test-", "^absent-"] }]
		});
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");
		expect(ComponentFactory.get<TestComponent>("kept-component").work()).toEqual("marked:raw");

		await engine.stop();
	});

	test("applies an exclusion only to the facade which carries it", async () => {
		FacadeFactory.register("inner", () => new MarkingFacade("inner"));

		const engine = makeEngine({
			component: [{ name: "marking", excludeTypes: ["^test-"] }, { name: "inner" }]
		});
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("inner:raw");

		await engine.stop();
	});

	test("fails to start when an exclude type is not a valid pattern", async () => {
		const engine = makeEngine({ component: [{ name: "marking", excludeTypes: ["[unclosed"] }] });

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeExcludeTypeInvalid"
			})
		);
	});

	test("reports which facade an invalid exclude type came from", async () => {
		const engine = makeEngine({ component: [{ name: "marking", excludeTypes: ["[unclosed"] }] });

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				properties: {
					excludeType: "[unclosed",
					facadeName: "marking",
					factoryTypeName: "component"
				}
			})
		);
	});

	test("activates no facades when a later factory in the configuration is unknown", async () => {
		const engine = makeEngine({
			component: [{ name: "marking" }],
			"not-a-factory": [{ name: "marking" }]
		});

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeFactoryUnknown"
			})
		);

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");
	});

	test("activates no facades when a later facade in the configuration is unknown", async () => {
		const engine = makeEngine({
			component: [{ name: "marking" }, { name: "missing" }]
		});

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeUnknown"
			})
		);

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");
	});

	test("activates no facades when a later exclude type is not a valid pattern", async () => {
		const engine = makeEngine({
			component: [{ name: "marking" }, { name: "inner", excludeTypes: ["[unclosed"] }]
		});
		FacadeFactory.register("inner", () => new MarkingFacade("inner"));

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeExcludeTypeInvalid"
			})
		);

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");
	});

	test("activates no facades when a later factory is the facade factory", async () => {
		const engine = makeEngine({
			component: [{ name: "marking" }],
			facade: [{ name: "marking" }]
		});

		await expect(engine.start()).rejects.toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "engineCore.facadeOnFacadeFactory"
			})
		);

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");
	});

	test("wraps a component constructed by a type initialiser", async () => {
		const engine = makePipelineEngine(
			{
				pipelineComponent: [{ type: "pipeline" }],
				facade: [{ type: "pipeline" }]
			},
			{ component: [{ name: "pipeline-facade" }] },
			[
				{ type: "pipelineComponent", method: "initialisePipelineComponent" },
				{ type: "facade", method: "initialisePipelineFacade" }
			]
		);
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("pipeline-component").work()).toEqual("marked:raw");

		await engine.stop();
	});

	test("activates the facades before the other components are constructed", async () => {
		// The facade type initialiser is added last, so without the facades being hoisted the
		// dependency captured in the constructor of the dependent component would be unwrapped.
		const engine = makePipelineEngine(
			{
				pipelineComponent: [{ type: "pipeline" }],
				pipelineDependent: [{ type: "pipeline" }],
				facade: [{ type: "pipeline" }]
			},
			{ component: [{ name: "pipeline-facade" }] },
			[
				{ type: "pipelineComponent", method: "initialisePipelineComponent" },
				{ type: "pipelineDependent", method: "initialisePipelineDependent" },
				{ type: "facade", method: "initialisePipelineFacade" }
			]
		);
		await engine.start();

		const dependent = ComponentFactory.get<DependentComponent>("pipeline-dependent");
		expect(dependent.dependencyWork()).toEqual("marked:marked:raw");

		await engine.stop();
	});

	test("resolves the instance type of a type which is initialised later", async () => {
		// Every type is resolved before anything is constructed, so a component can be handed the
		// instance type of one whose initialiser runs after it.
		const engine = makePipelineEngine(
			{
				pipelineNaming: [{ type: "pipeline" }],
				pipelineComponent: [{ type: "pipeline" }]
			},
			undefined,
			[
				{ type: "pipelineNaming", method: "initialisePipelineNaming" },
				{ type: "pipelineComponent", method: "initialisePipelineComponent" }
			]
		);
		await engine.start();

		const naming = ComponentFactory.get<NamingComponent>("pipeline-naming");
		expect(naming.dependencyType()).toEqual("pipeline-component");

		await engine.stop();
	});

	test("resolves an overridden instance type of a type which is initialised later", async () => {
		const engine = makePipelineEngine(
			{
				pipelineNaming: [{ type: "pipeline" }],
				pipelineComponent: [{ type: "pipeline", overrideInstanceType: "renamed-component" }]
			},
			undefined,
			[
				{ type: "pipelineNaming", method: "initialisePipelineNaming" },
				{ type: "pipelineComponent", method: "initialisePipelineComponent" }
			]
		);
		await engine.start();

		const naming = ComponentFactory.get<NamingComponent>("pipeline-naming");
		expect(naming.dependencyType()).toEqual("renamed-component");

		await engine.stop();
	});

	test("starts the facades before the components they wrap", async () => {
		const engine = makePipelineEngine(
			{
				pipelineComponent: [{ type: "pipeline" }],
				facade: [{ type: "pipeline" }]
			},
			{ component: [{ name: "pipeline-facade" }] },
			[
				{ type: "pipelineComponent", method: "initialisePipelineComponent" },
				{ type: "facade", method: "initialisePipelineFacade" }
			]
		);
		await engine.start();

		const instanceTypes = (await engine.getRegisteredComponents()).map(c => c.instanceType);
		expect(instanceTypes.indexOf("pipeline-facade")).toBeLessThan(
			instanceTypes.indexOf("pipeline-component")
		);

		await engine.stop();
	});

	test("wraps a multi instance component created from the factory", async () => {
		const engine = makePipelineEngine(
			{
				pipelineComponent: [{ type: "pipeline", isMultiInstance: true }],
				facade: [{ type: "pipeline" }]
			},
			{ component: [{ name: "pipeline-facade" }] },
			[
				{ type: "pipelineComponent", method: "initialisePipelineComponent" },
				{ type: "facade", method: "initialisePipelineFacade" }
			]
		);
		await engine.start();

		expect(ComponentFactory.create<TestComponent>("pipeline-component", {}).work()).toEqual(
			"marked:raw"
		);

		await engine.stop();
	});

	test("matches an exclude pattern against the overridden instance type", async () => {
		const engine = makePipelineEngine(
			{
				pipelineComponent: [{ type: "pipeline", overrideInstanceType: "renamed-component" }],
				facade: [{ type: "pipeline" }]
			},
			{ component: [{ name: "pipeline-facade", excludeTypes: ["^renamed-"] }] },
			[
				{ type: "pipelineComponent", method: "initialisePipelineComponent" },
				{ type: "facade", method: "initialisePipelineFacade" }
			]
		);
		await engine.start();

		expect(ComponentFactory.get<TestComponent>("renamed-component").work()).toEqual("raw");

		await engine.stop();
	});

	test("carries the facade configuration into the clone data", async () => {
		const engine = makeEngine({ component: [{ name: "marking" }] });
		await engine.start();

		expect(engine.getCloneData().config.facades).toEqual({ component: [{ name: "marking" }] });

		await engine.stop();
	});

	test("activates the facades of a clone", async () => {
		const parent = makeEngine({ component: [{ name: "marking" }] });
		await parent.start();
		await parent.stop();

		const clone = new EngineCore();
		clone.populateClone(parent.getCloneData());
		await clone.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("marked:raw");

		await clone.stop();
	});

	test("overrides the facades of a clone", async () => {
		FacadeFactory.register("inner", () => new MarkingFacade("inner"));

		const parent = makeEngine({ component: [{ name: "marking" }] });
		await parent.start();
		await parent.stop();

		const clone = new EngineCore();
		clone.populateClone(parent.getCloneData(), undefined, {
			facades: { component: [{ name: "inner" }] }
		});
		await clone.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("inner:raw");

		await clone.stop();
	});

	test("activates no facades for a clone given an empty override", async () => {
		const parent = makeEngine({ component: [{ name: "marking" }] });
		await parent.start();
		await parent.stop();

		const clone = new EngineCore();
		clone.populateClone(parent.getCloneData(), undefined, { facades: {} });
		await clone.start();

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");

		await clone.stop();
	});

	test("deactivates the facades when the engine fails to start", async () => {
		const engine = new EngineCore<IEngineCoreConfig>({
			config: { silent: true, types: {}, facades: { component: [{ name: "marking" }] } },
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				throw new Error("bootstrap failed");
			}
		});

		await expect(engine.start()).rejects.toThrow("bootstrap failed");

		expect(ComponentFactory.get<TestComponent>("test-component").work()).toEqual("raw");
	});

	test("does not register the pipeline instances twice when restarted", async () => {
		const engine = makePipelineEngine({ pipelineComponent: [{ type: "default" }] }, undefined, [
			{ type: "pipelineComponent", method: "initialisePipelineComponent" }
		]);

		await engine.start();
		await engine.stop();
		await engine.start();

		expect(engine.getRegisteredInstances().pipelineComponent).toEqual([
			{ type: "pipeline-component", isDefault: undefined, features: undefined }
		]);
		const instanceTypes = (await engine.getRegisteredComponents()).map(c => c.instanceType);
		expect(instanceTypes.filter(t => t === "pipeline-component")).toHaveLength(1);

		await engine.stop();
	});
});
