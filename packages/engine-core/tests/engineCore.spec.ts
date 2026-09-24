// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, I18n, type IComponent } from "@twin.org/core";
import {
	EngineLogLevel,
	type IEngineCoreConfig,
	type IEngineStateStorage
} from "@twin.org/engine-models";
import locales from "../locales/en.json" with { type: "json" };
import { EngineCore } from "../src/engineCore.js";
import { MemoryStateStorage } from "../src/storage/memoryStateStorage.js";

/**
 * Test engine core which can add startable components directly.
 */
class TestEngineCore extends EngineCore {
	/**
	 * Add a component which will be started by the engine.
	 * @param instanceType The instance type to register the component under.
	 * @param component The component to add.
	 */
	public addStartableComponent(instanceType: string, component: IComponent): void {
		this._context.componentInstances.push({ instanceType, component, initialised: false });
	}
}

/**
 * Test component with an artificially slow start.
 */
class SlowStartComponent implements IComponent {
	/**
	 * Returns the class name of the component.
	 * @returns The class name of the component.
	 */
	public className(): string {
		return "SlowStartComponent";
	}

	/**
	 * Start the component.
	 * @returns A promise that resolves when the component has started.
	 */
	public async start(): Promise<void> {
		await new Promise<void>(resolve => {
			setTimeout(resolve, 50);
		});
	}
}

/**
 * Test component whose start always fails.
 */
class FailingStartComponent implements IComponent {
	/**
	 * Returns the class name of the component.
	 * @returns The class name of the component.
	 */
	public className(): string {
		return "FailingStartComponent";
	}

	/**
	 * Start the component.
	 * @returns A promise that always rejects.
	 */
	public async start(): Promise<void> {
		throw new GeneralError("FailingStartComponent", "startFailed");
	}
}

/**
 * Test component which records the order in which it is started and stopped.
 */
class OrderRecordingComponent implements IComponent {
	/**
	 * The name used to identify the component in the recorded order.
	 * @internal
	 */
	private readonly _name: string;

	/**
	 * The shared list the start and stop calls are recorded in.
	 * @internal
	 */
	private readonly _order: string[];

	/**
	 * Create a new instance of OrderRecordingComponent.
	 * @param name The name used to identify the component in the recorded order.
	 * @param order The shared list the start and stop calls are recorded in.
	 */
	constructor(name: string, order: string[]) {
		this._name = name;
		this._order = order;
	}

	/**
	 * Returns the class name of the component.
	 * @returns The class name of the component.
	 */
	public className(): string {
		return "OrderRecordingComponent";
	}

	/**
	 * Start the component.
	 * @returns A promise that resolves when the component has started.
	 */
	public async start(): Promise<void> {
		this._order.push(`start:${this._name}`);
	}

	/**
	 * Stop the component.
	 * @returns A promise that resolves when the component has stopped.
	 */
	public async stop(): Promise<void> {
		this._order.push(`stop:${this._name}`);
	}
}

describe("engine-core", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", locales);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("Can start engine core with no config", async () => {
		const engine = new EngineCore();
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Stops the components in the reverse order they were started", async () => {
		// A component started later can depend on an earlier one still running to complete its
		// own shutdown, so teardown has to mirror startup.
		const order: string[] = [];
		const engine = new TestEngineCore();
		engine.addStartableComponent("first", new OrderRecordingComponent("first", order));
		engine.addStartableComponent("second", new OrderRecordingComponent("second", order));
		engine.addStartableComponent("third", new OrderRecordingComponent("third", order));

		await engine.start();
		await engine.stop();

		expect(order).toEqual([
			"start:first",
			"start:second",
			"start:third",
			"stop:third",
			"stop:second",
			"stop:first"
		]);
	});

	test("Can start engine core with config and custom bootstrap", async () => {
		let calledCustomBootstrap = false;

		const engine = new EngineCore({
			config: {
				debug: true,
				types: {}
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();
	});

	test("Can log per-component start timing at debug level", async () => {
		const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});

		const engine = new TestEngineCore();
		engine.addStartableComponent("slow-start-component", new SlowStartComponent());
		await engine.start();
		await engine.stop();

		const calls = debugSpy.mock.calls.map(call => call.join(" "));

		const startedLine = calls.find(call =>
			call.includes('Started component type "SlowStartComponent"')
		);
		expect(startedLine).toContain('instance type "slow-start-component"');
		const elapsedMs = Number(/in (\d+)ms/.exec(startedLine ?? "")?.[1]);
		expect(elapsedMs).toBeGreaterThanOrEqual(40);

		const summaryLine = calls.find(call => call.includes("slowest:"));
		expect(summaryLine).toMatch(/Components started in \d+ms/);
		expect(summaryLine).toContain("SlowStartComponent (slow-start-component)");
	});

	test("Can populate a clone with error log level and surface component start failures", async () => {
		const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
		const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const engine = new EngineCore({
			config: { silent: true, types: {} },
			stateStorage: new MemoryStateStorage()
		});
		await engine.start();
		await engine.stop();

		const cloneData = engine.getCloneData();
		const clone = new TestEngineCore();
		clone.populateClone(cloneData, undefined, { logLevel: EngineLogLevel.Error });
		clone.addStartableComponent("failing-start-component", new FailingStartComponent());

		await expect(clone.start()).rejects.toThrow();

		expect(clone.getConfig().logLevel).toEqual(EngineLogLevel.Error);
		expect(errorSpy).toHaveBeenCalledWith(
			expect.any(String),
			expect.any(String),
			expect.any(String),
			expect.stringContaining('Failed to start component type "FailingStartComponent"')
		);
		expect(infoSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
	});

	test("Can populate a clone with legacy silent boolean mapping to error level", async () => {
		const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const engine = new EngineCore({
			config: { silent: true, types: {} },
			stateStorage: new MemoryStateStorage()
		});
		await engine.start();
		await engine.stop();

		const cloneData = engine.getCloneData();
		const clone = new TestEngineCore();
		clone.populateClone(cloneData, undefined, true);
		clone.addStartableComponent("failing-start-component", new FailingStartComponent());

		await expect(clone.start()).rejects.toThrow();

		expect(clone.getConfig().logLevel).toEqual(EngineLogLevel.Error);
		expect(errorSpy).toHaveBeenCalledWith(
			expect.any(String),
			expect.any(String),
			expect.any(String),
			expect.stringContaining('Failed to start component type "FailingStartComponent"')
		);
		expect(infoSpy).not.toHaveBeenCalled();
	});

	test("Can populate a clone with none log level and produce no output", async () => {
		const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
		const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const engine = new EngineCore({
			config: { silent: true, types: {} },
			stateStorage: new MemoryStateStorage()
		});
		await engine.start();
		await engine.stop();

		const cloneData = engine.getCloneData();
		const clone = new TestEngineCore();
		clone.populateClone(cloneData, undefined, { logLevel: EngineLogLevel.None });
		clone.addStartableComponent("failing-start-component", new FailingStartComponent());

		await expect(clone.start()).rejects.toThrow();

		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
	});

	test("Can populate a clone without a log level and keep full output", async () => {
		const engine = new EngineCore({
			stateStorage: new MemoryStateStorage()
		});
		await engine.start();
		await engine.stop();

		const cloneData = engine.getCloneData();

		const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

		const clone = new TestEngineCore();
		clone.populateClone(cloneData);
		await clone.start();
		await clone.stop();

		expect(infoSpy).toHaveBeenCalledWith(
			expect.any(String),
			expect.any(String),
			expect.any(String),
			expect.stringContaining("Engine is starting")
		);
	});

	test("Can fail to populate a clone with an invalid log level", async () => {
		const engine = new EngineCore();
		const cloneData = engine.getCloneData();

		const clone = new EngineCore();
		expect(() =>
			clone.populateClone(cloneData, undefined, {
				logLevel: "verbose" as unknown as EngineLogLevel
			})
		).toThrow();
	});

	test("Can isolate clone state from parent state", async () => {
		const parentState = {
			nodeId: "parent-node",
			nested: {
				counter: 1
			}
		};

		const parent = new EngineCore({
			config: { silent: true, types: {} },
			stateStorage: new MemoryStateStorage(false, parentState)
		});

		await parent.start();

		const cloneData = parent.getCloneData();
		expect(cloneData.state).not.toBe(parent.getState());

		const clone = new EngineCore();
		clone.populateClone(cloneData);
		await clone.start();

		expect(clone.getState()).not.toBe(parent.getState());

		(clone.getState() as typeof parentState).nested.counter = 2;
		expect(parent.getState().nested.counter).toBe(1);

		await clone.stop();
		await parent.stop();
	});

	test("Does not modify the clone data or the parent when populating a clone", async () => {
		const parent = new EngineCore<IEngineCoreConfig>({ config: { silent: true, types: {} } });
		parent.addTypeInitialiser("custom", "module", "method");
		parent.addContextIdKey("node", ["did"]);

		const cloneData = parent.getCloneData();
		const clone = new EngineCore();
		clone.populateClone(cloneData, undefined, true);
		clone.addTypeInitialiser("custom", "other-module", "other-method");

		expect(clone.getConfig().logLevel).toEqual(EngineLogLevel.Error);
		expect(cloneData.config.logLevel).toBeUndefined();
		expect(cloneData.typeInitialisers).toEqual([
			{ type: "custom", module: "module", method: "method" }
		]);
		expect(parent.getCloneData().typeInitialisers).toEqual([
			{ type: "custom", module: "module", method: "method" }
		]);
		expect(clone.getContextIdKeys()).toEqual(["node"]);
	});

	test("Keeps the state separate for clones populated from the same clone data", async () => {
		const parent = new EngineCore({
			config: { silent: true, types: {} },
			stateStorage: new MemoryStateStorage(false, { nested: { counter: 1 } })
		});
		await parent.start();
		const cloneData = parent.getCloneData();
		await parent.stop();

		const firstClone = new EngineCore();
		firstClone.populateClone(cloneData);
		const secondClone = new EngineCore();
		secondClone.populateClone(cloneData);
		await firstClone.start();
		await secondClone.start();

		(firstClone.getState() as { nested: { counter: number } }).nested.counter = 2;

		expect((secondClone.getState() as { nested: { counter: number } }).nested.counter).toEqual(1);
		expect(cloneData.state.nested.counter).toEqual(1);

		await firstClone.stop();
		await secondClone.stop();
	});

	test("Keeps state marked dirty while a save is in progress for the next save", async () => {
		let saveCount = 0;
		const stateStorage: IEngineStateStorage = {
			load: async () => ({ value: 1 }),
			save: async engineCore => {
				saveCount++;
				if (saveCount === 1) {
					engineCore.setStateDirty();
				}
			}
		};
		const engine = new EngineCore({ config: { silent: true, types: {} }, stateStorage });

		await engine.start();
		engine.setStateDirty();
		await engine.stop();
		await engine.stop();

		expect(saveCount).toEqual(2);
	});

	test("Does not start the components of a previous start again when restarted", async () => {
		const engine = new EngineCore({ config: { silent: true, types: {} } });

		await engine.start();
		const firstStartComponents = (await engine.getRegisteredComponents()).length;
		await engine.stop();
		await engine.start();

		expect(await engine.getRegisteredComponents()).toHaveLength(firstStartComponents);
		expect(engine.getRegisteredInstances().loggingConnector).toHaveLength(1);

		await engine.stop();
	});
});
