// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n } from "@twin.org/core";
import { EngineCoreFactory, EngineLogLevel, type IEngineCoreClone } from "@twin.org/engine-models";
import locales from "../locales/en.json" with { type: "json" };
import { EngineCore } from "../src/engineCore.js";
import { EngineCoreBuilder } from "../src/utils/engineCoreBuilder.js";

const INSTANCE_NAME = "test-engine-instance";

describe("EngineCoreBuilder", () => {
	let cloneData: IEngineCoreClone;

	beforeAll(async () => {
		I18n.addDictionary("en", locales);

		const source = new EngineCore({ config: { silent: true, types: {} } });
		await source.start();
		await source.stop();
		cloneData = source.getCloneData();
	});

	afterEach(() => {
		try {
			EngineCoreFactory.unregister(INSTANCE_NAME);
		} catch {}
		vi.restoreAllMocks();
	});

	test("fromClone returns an EngineCore instance", () => {
		const result = EngineCoreBuilder.fromClone(INSTANCE_NAME, cloneData);
		expect(result).toBeInstanceOf(EngineCore);
	});

	test("fromClone registers the engine in EngineCoreFactory under instanceName", () => {
		EngineCoreBuilder.fromClone(INSTANCE_NAME, cloneData);
		expect(EngineCoreFactory.getIfExists(INSTANCE_NAME)).toBeDefined();
	});

	test("the engine registered in EngineCoreFactory is the returned instance", () => {
		const result = EngineCoreBuilder.fromClone(INSTANCE_NAME, cloneData);
		expect(EngineCoreFactory.getIfExists(INSTANCE_NAME)).toBe(result);
	});

	test("populates the engine config from clone data", () => {
		const result = EngineCoreBuilder.fromClone(INSTANCE_NAME, cloneData) as unknown as EngineCore;
		expect(result.getConfig()).toEqual(cloneData.config);
	});

	test("passes logLevel option to populateClone", () => {
		const result = EngineCoreBuilder.fromClone(INSTANCE_NAME, cloneData, undefined, {
			logLevel: EngineLogLevel.Error
		}) as unknown as EngineCore;
		expect(result.getConfig().logLevel).toEqual(EngineLogLevel.Error);
	});

	test("passes types allowlist option to populateClone", () => {
		const result = EngineCoreBuilder.fromClone(INSTANCE_NAME, cloneData, undefined, {
			types: ["nonExistentType"]
		}) as unknown as EngineCore;
		expect(result.getConfig().types).toEqual({});
	});

	test("multiple calls produce separate engine core instances", () => {
		const result1 = EngineCoreBuilder.fromClone("instance-1", cloneData);
		const result2 = EngineCoreBuilder.fromClone("instance-2", cloneData);

		try {
			expect(result1).not.toBe(result2);
			expect(EngineCoreFactory.getIfExists("instance-1")).toBe(result1);
			expect(EngineCoreFactory.getIfExists("instance-2")).toBe(result2);
		} finally {
			EngineCoreFactory.unregister("instance-1");
			EngineCoreFactory.unregister("instance-2");
		}
	});
});
