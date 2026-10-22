// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, GeneralError, Guards, Is } from "@3sixty/core";
import { nameof } from "@3sixty/nameof";
import type { IEngineCoreConfig } from "../models/config/IEngineCoreConfig.js";
import { EngineCloneMode } from "../models/engineCloneMode.js";
import type { IEngineCoreClone } from "../models/IEngineCoreClone.js";

/**
 * Helper methods for narrowing engine clone data before a clone is built from it.
 */
export class EngineCloneHelper {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<EngineCloneHelper>();

	/**
	 * Verify the exclude clone component patterns, compiling each one so an invalid pattern fails early.
	 * @param excludeCloneComponents The patterns to verify.
	 * @returns The verified patterns, or undefined when none were supplied.
	 * @throws GeneralError if a pattern is not a valid regular expression.
	 */
	public static verifyExcludeCloneComponents(
		excludeCloneComponents?: string[]
	): string[] | undefined {
		if (Is.empty(excludeCloneComponents)) {
			return undefined;
		}

		Guards.array(
			EngineCloneHelper.CLASS_NAME,
			nameof(excludeCloneComponents),
			excludeCloneComponents
		);

		const verified: string[] = [];
		for (const excludeCloneComponent of excludeCloneComponents) {
			Guards.stringValue(
				EngineCloneHelper.CLASS_NAME,
				nameof(excludeCloneComponent),
				excludeCloneComponent
			);
			verified.push(EngineCloneHelper.compileExcludePattern(excludeCloneComponent).source);
		}

		return verified;
	}

	/**
	 * Remove the component types matched by the exclude patterns from the clone data.
	 * @param cloneData The clone data to filter, it is not mutated.
	 * @param excludeTypes The regular expression patterns for the type keys to remove.
	 * @param keepAlways When true, entries with cloneMode Always under a matched key are retained.
	 * @returns The filtered clone data, or the original when there is nothing to filter.
	 * @throws GeneralError if a pattern is not a valid regular expression.
	 */
	public static filterCloneComponents<T extends IEngineCoreClone>(
		cloneData: T,
		excludeTypes?: string[],
		keepAlways?: boolean
	): T {
		Guards.object(EngineCloneHelper.CLASS_NAME, nameof(cloneData), cloneData);

		if (
			!Is.arrayValue(excludeTypes) ||
			!Is.object(cloneData.config) ||
			!Is.object(cloneData.config.types)
		) {
			return cloneData;
		}

		const patterns = excludeTypes.map(excludeType =>
			EngineCloneHelper.compileExcludePattern(excludeType)
		);

		const sourceTypes = cloneData.config.types;
		const filteredTypes: IEngineCoreConfig["types"] = {};
		for (const typeKey of Object.keys(sourceTypes)) {
			const entries = sourceTypes[typeKey];
			if (!patterns.some(pattern => pattern.test(typeKey))) {
				filteredTypes[typeKey] = entries;
			} else if (keepAlways === true && Is.arrayValue(entries)) {
				const alwaysEntries = entries.filter(entry => entry.cloneMode === EngineCloneMode.Always);
				if (alwaysEntries.length > 0) {
					filteredTypes[typeKey] = alwaysEntries;
				}
			}
		}

		return { ...cloneData, config: { ...cloneData.config, types: filteredTypes } };
	}

	/**
	 * Compile an exclude pattern.
	 * @param pattern The pattern to compile.
	 * @returns The compiled pattern.
	 * @throws GeneralError if the pattern is not a valid regular expression.
	 * @internal
	 */
	private static compileExcludePattern(pattern: string): RegExp {
		try {
			return new RegExp(pattern);
		} catch (err) {
			throw new GeneralError(
				EngineCloneHelper.CLASS_NAME,
				"invalidExcludeCloneComponent",
				{ pattern },
				BaseError.fromError(err)
			);
		}
	}
}
