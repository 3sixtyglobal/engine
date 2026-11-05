// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Data extractor connector types.
 */
export const DataExtractorConnectorType = {
	/**
	 * JSON Path.
	 */
	JsonPath: "json-path"
} as const;

/**
 * Data extractor connector types.
 */
export type DataExtractorConnectorType =
	(typeof DataExtractorConnectorType)[keyof typeof DataExtractorConnectorType];
