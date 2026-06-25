// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for an engine module.
 */
export interface IEngineModuleConfig {
	/**
	 * The unique identifier for the module.
	 */
	id: string;

	/**
	 * The module that implements the additional component.
	 */
	moduleName: string;

	/**
	 * The class name of the additional component.
	 */
	className: string;

	/**
	 * Additional dependencies required by the component.
	 */
	dependencies?: {
		propertyName: string;
		componentName: string;
		features?: string[];
		isOptional?: boolean;
	}[];

	/**
	 * Additional configuration for the component.
	 */
	config?: unknown;
}
