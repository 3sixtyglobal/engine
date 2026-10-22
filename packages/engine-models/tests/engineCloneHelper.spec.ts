// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, GuardError } from "@3sixty/core";
import { EngineCloneHelper } from "../src/helpers/engineCloneHelper.js";
import { EngineCloneMode } from "../src/models/engineCloneMode.js";
import type { IEngineCoreClone } from "../src/models/IEngineCoreClone.js";

/**
 * Build clone data with a mix of clone modes under the rights management keys.
 * @returns The clone data.
 */
function createCloneData(): IEngineCoreClone {
	return {
		config: {
			types: {
				loggingConnector: [{ type: "console" }],
				identityComponent: [{ type: "service", cloneMode: EngineCloneMode.Never }],
				rightsManagementPapComponent: [
					{ type: "service", cloneMode: EngineCloneMode.Optional },
					{ type: "cache", cloneMode: EngineCloneMode.Always },
					{ type: "audit", cloneMode: EngineCloneMode.Never }
				],
				rightsManagementPdpComponent: [{ type: "service" }]
			}
		},
		state: {},
		typeInitialisers: [],
		entitySchemas: {},
		contextIdKeys: []
	};
}

describe("EngineCloneHelper", () => {
	describe("verifyExcludeCloneComponents", () => {
		test("returns undefined when no patterns are supplied", () => {
			expect(EngineCloneHelper.verifyExcludeCloneComponents()).toBeUndefined();
			expect(EngineCloneHelper.verifyExcludeCloneComponents(undefined)).toBeUndefined();
		});

		test("returns an empty list for an empty list", () => {
			expect(EngineCloneHelper.verifyExcludeCloneComponents([])).toEqual([]);
		});

		test("returns the verified patterns", () => {
			expect(
				EngineCloneHelper.verifyExcludeCloneComponents(["^rightsManagement", "^messaging"])
			).toEqual(["^rightsManagement", "^messaging"]);
		});

		test("throws invalidExcludeCloneComponent with the offending pattern and the cause", () => {
			const verify = (): string[] | undefined =>
				EngineCloneHelper.verifyExcludeCloneComponents(["("]);

			expect(verify).toThrow("invalidExcludeCloneComponent");

			try {
				verify();
			} catch (err) {
				const error = BaseError.fromError(err);
				expect(error.properties?.pattern).toEqual("(");
				expect(error.cause?.message).toContain("Invalid regular expression");
			}
		});

		test("checks every pattern, not just the first", () => {
			expect(() => EngineCloneHelper.verifyExcludeCloneComponents(["^ok", "["])).toThrow(
				"invalidExcludeCloneComponent"
			);
		});

		test("throws a guard error when the patterns are not an array", () => {
			expect(() =>
				EngineCloneHelper.verifyExcludeCloneComponents("^ok" as unknown as string[])
			).toThrow(GuardError);
		});

		test("throws a guard error when a pattern is not a string", () => {
			expect(() =>
				EngineCloneHelper.verifyExcludeCloneComponents([42] as unknown as string[])
			).toThrow(GuardError);
		});
	});

	describe("filterCloneComponents", () => {
		test("returns the same clone data when no patterns are supplied", () => {
			const cloneData = createCloneData();
			expect(EngineCloneHelper.filterCloneComponents(cloneData)).toBe(cloneData);
			expect(EngineCloneHelper.filterCloneComponents(cloneData, undefined)).toBe(cloneData);
		});

		test("returns the same clone data when the pattern list is empty", () => {
			const cloneData = createCloneData();
			expect(EngineCloneHelper.filterCloneComponents(cloneData, [])).toBe(cloneData);
		});

		test("returns the same clone data when there are no types to filter", () => {
			const cloneData = { config: {}, state: {} } as unknown as IEngineCoreClone;
			expect(EngineCloneHelper.filterCloneComponents(cloneData, ["^rightsManagement"])).toBe(
				cloneData
			);
		});

		test("throws a guard error when the clone data is missing", () => {
			expect(() =>
				EngineCloneHelper.filterCloneComponents(undefined as unknown as IEngineCoreClone, [
					"^rightsManagement"
				])
			).toThrow(GuardError);
		});

		test("removes the keys matching a pattern and keeps the others in order", () => {
			const result = EngineCloneHelper.filterCloneComponents(createCloneData(), [
				"^rightsManagement"
			]);

			expect(Object.keys(result.config.types)).toEqual(["loggingConnector", "identityComponent"]);
		});

		test("removes the keys matching any of several patterns", () => {
			const result = EngineCloneHelper.filterCloneComponents(createCloneData(), [
				"^rightsManagement",
				"^loggingConnector$"
			]);

			expect(Object.keys(result.config.types)).toEqual(["identityComponent"]);
		});

		test("treats the patterns as unanchored regular expressions", () => {
			const result = EngineCloneHelper.filterCloneComponents(createCloneData(), ["Component$"]);

			expect(Object.keys(result.config.types)).toEqual(["loggingConnector"]);
		});

		test("keeps every key when no pattern matches", () => {
			const result = EngineCloneHelper.filterCloneComponents(createCloneData(), [
				"^noSuchComponent$"
			]);

			expect(Object.keys(result.config.types)).toHaveLength(4);
		});

		test("removes Always entries under a matched key when keepAlways is not set", () => {
			const result = EngineCloneHelper.filterCloneComponents(createCloneData(), [
				"^rightsManagement"
			]);

			expect(result.config.types.rightsManagementPapComponent).toBeUndefined();
		});

		test("removes Always entries under a matched key when keepAlways is false", () => {
			const result = EngineCloneHelper.filterCloneComponents(
				createCloneData(),
				["^rightsManagement"],
				false
			);

			expect(result.config.types.rightsManagementPapComponent).toBeUndefined();
		});

		test("retains only the Always entries under a matched key when keepAlways is true", () => {
			const result = EngineCloneHelper.filterCloneComponents(
				createCloneData(),
				["^rightsManagement"],
				true
			);

			expect(Object.keys(result.config.types)).toEqual([
				"loggingConnector",
				"identityComponent",
				"rightsManagementPapComponent"
			]);
			expect(result.config.types.rightsManagementPapComponent).toEqual([
				{ type: "cache", cloneMode: EngineCloneMode.Always }
			]);
		});

		test("drops a matched key with no Always entries when keepAlways is true", () => {
			const result = EngineCloneHelper.filterCloneComponents(
				createCloneData(),
				["^rightsManagementPdp"],
				true
			);

			expect(result.config.types.rightsManagementPdpComponent).toBeUndefined();
		});

		test("leaves Never entries under an unmatched key untouched", () => {
			const cloneData = createCloneData();
			const result = EngineCloneHelper.filterCloneComponents(cloneData, ["^rightsManagement"]);

			expect(result.config.types.identityComponent).toBe(cloneData.config.types.identityComponent);
			expect(result.config.types.identityComponent).toEqual([
				{ type: "service", cloneMode: EngineCloneMode.Never }
			]);
		});

		test("does not mutate the clone data", () => {
			const cloneData = createCloneData();
			const snapshot = JSON.stringify(cloneData);

			const result = EngineCloneHelper.filterCloneComponents(
				cloneData,
				["^rightsManagement"],
				true
			);

			expect(result).not.toBe(cloneData);
			expect(result.config).not.toBe(cloneData.config);
			expect(result.config.types).not.toBe(cloneData.config.types);
			expect(JSON.stringify(cloneData)).toEqual(snapshot);
		});

		test("preserves the other clone data members", () => {
			const cloneData = createCloneData();
			const result = EngineCloneHelper.filterCloneComponents(cloneData, ["^rightsManagement"]);

			expect(result.state).toBe(cloneData.state);
			expect(result.typeInitialisers).toBe(cloneData.typeInitialisers);
			expect(result.entitySchemas).toBe(cloneData.entitySchemas);
			expect(result.contextIdKeys).toBe(cloneData.contextIdKeys);
		});

		test("throws invalidExcludeCloneComponent for an invalid pattern", () => {
			expect(() => EngineCloneHelper.filterCloneComponents(createCloneData(), ["("])).toThrow(
				"invalidExcludeCloneComponent"
			);
		});
	});
});
