// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { BaseError, GeneralError, Guards, I18n } from "@twin.org/core";
import type { IEngineCore, IEngineState, IEngineStateStorage } from "@twin.org/engine-models";
import { nameof, nameofCamelCase } from "@twin.org/nameof";

/**
 * Store state in a file.
 */
export class FileStateStorage<S extends IEngineState = IEngineState>
	implements IEngineStateStorage<S>
{
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<FileStateStorage>();

	/**
	 * The filename to store the state.
	 * @internal
	 */
	private readonly _filename: string;

	/**
	 * Readonly mode state file is not updated.
	 * @internal
	 */
	private readonly _readonlyMode: boolean;

	/**
	 * Create a new instance of FileStateStorage.
	 * @param filename The filename to store the state.
	 * @param readonlyMode Whether the file is in read-only mode.
	 */
	constructor(filename: string, readonlyMode: boolean = false) {
		Guards.stringValue(FileStateStorage.CLASS_NAME, nameof(filename), filename);
		this._filename = filename;
		this._readonlyMode = readonlyMode;
	}

	/**
	 * Method for loading the state.
	 * @param engineCore The engine core to load the state for.
	 * @returns The state of the engine or undefined if it doesn't exist.
	 */
	public async load(engineCore: IEngineCore): Promise<S | undefined> {
		try {
			engineCore.logInfo(
				I18n.formatMessage(`${nameofCamelCase<FileStateStorage>()}.loading`, {
					filename: this._filename
				})
			);
			if (await this.fileExists(this._filename)) {
				const content = await readFile(this._filename, "utf8");
				return JSON.parse(content.toString()) as S;
			}
		} catch (err) {
			throw new GeneralError(
				FileStateStorage.CLASS_NAME,
				"failedLoading",
				{ filename: this._filename },
				BaseError.fromError(err)
			);
		}
	}

	/**
	 * Method for saving the state.
	 * @param engineCore The engine core to save the state for.
	 * @param state The state of the engine to save.
	 * @returns Nothing.
	 */
	public async save(engineCore: IEngineCore, state: S): Promise<void> {
		if (!this._readonlyMode) {
			try {
				engineCore.logInfo(
					I18n.formatMessage(`${nameofCamelCase<FileStateStorage>()}.saving`, {
						filename: this._filename
					})
				);
				try {
					await mkdir(path.dirname(this._filename), { recursive: true });
				} catch {}
				await writeFile(this._filename, JSON.stringify(state, undefined, "\t"), "utf8");
			} catch (err) {
				throw new GeneralError(
					FileStateStorage.CLASS_NAME,
					"failedSaving",
					{ filename: this._filename },
					BaseError.fromError(err)
				);
			}
		}
	}

	/**
	 * Does the specified file exist.
	 * @param filename The filename to check for existence.
	 * @returns True if the file exists.
	 * @internal
	 */
	private async fileExists(filename: string): Promise<boolean> {
		try {
			const stats = await stat(filename);
			return stats.isFile();
		} catch {
			return false;
		}
	}
}
