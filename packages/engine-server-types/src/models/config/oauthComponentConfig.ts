// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IOAuthServiceConstructorOptions } from "@3sixty/api-auth-oauth-service";
import type { OAuthComponentType } from "../types/oauthComponentType.js";

/**
 * OAuth component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type OAuthComponentConfig = {
	type: typeof OAuthComponentType.Service;
	options: IOAuthServiceConstructorOptions;
};
