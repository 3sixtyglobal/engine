// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Mime type route processor types.
 */
export const MimeTypeProcessorType = {
	/**
	 * Jwt.
	 */
	Jwt: "jwt"
} as const;

/**
 * Mime type processor types.
 */
export type MimeTypeProcessorType =
	(typeof MimeTypeProcessorType)[keyof typeof MimeTypeProcessorType];
