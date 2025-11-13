// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n } from "@twin.org/core";
import locales from "../locales/en.json" with { type: "json" };
import { EngineCore } from "../src/engineCore.js";
import { MemoryStateStorage } from "../src/storage/memoryStateStorage.js";

describe("engine-core", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", locales);
	});

	test("Can start engine core with no config", async () => {
		const engine = new EngineCore();
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Can start engine core with config and custom bootstrap", async () => {
		let calledCustomBootstrap = false;

		const engine = new EngineCore({
			config: {
				debug: true,
				availableContextIds: [],
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
});
