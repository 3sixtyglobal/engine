// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { I18n } from "@twin.org/core";
import locales from "../locales/en.json" with { type: "json" };
import { EngineCore } from "../src/engineCore.js";
import { FileStateStorage } from "../src/storage/fileStateStorage.js";

describe("FileStateStorage", () => {
	let testDirectory: string;

	beforeAll(async () => {
		I18n.addDictionary("en", locales);
	});

	beforeEach(async () => {
		testDirectory = await mkdtemp(path.join(os.tmpdir(), "engine-core-state-"));
	});

	afterEach(async () => {
		await rm(testDirectory, { recursive: true, force: true });
	});

	test("Can save the state to a directory which does not exist and load it again", async () => {
		const filename = path.join(testDirectory, "nested", "state.json");
		const stateStorage = new FileStateStorage(filename);
		const engineCore = new EngineCore();

		await stateStorage.save(engineCore, { nodeId: "node-1" });

		expect(await stateStorage.load(engineCore)).toEqual({ nodeId: "node-1" });
		expect(await readdir(path.dirname(filename))).toEqual(["state.json"]);
	});

	test("Returns no state when the file does not exist", async () => {
		const stateStorage = new FileStateStorage(path.join(testDirectory, "missing.json"));

		expect(await stateStorage.load(new EngineCore())).toBeUndefined();
	});

	test("Fails to load the state when the file content is invalid", async () => {
		const filename = path.join(testDirectory, "state.json");
		await writeFile(filename, "{ invalid", "utf8");
		const stateStorage = new FileStateStorage(filename);

		await expect(stateStorage.load(new EngineCore())).rejects.toThrow(
			expect.objectContaining({ name: "GeneralError", message: "fileStateStorage.failedLoading" })
		);
	});

	test("Does not write the state in read-only mode", async () => {
		const stateStorage = new FileStateStorage(path.join(testDirectory, "state.json"), true);

		await stateStorage.save(new EngineCore(), { nodeId: "node-1" });

		expect(await readdir(testDirectory)).toEqual([]);
	});
});
