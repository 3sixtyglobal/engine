// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationProviderConnectorConstructorOptions } from "@3sixty/api-auth-connector-entity-storage";
import type { IEntityStorageOAuthProviderConnectorConstructorOptions } from "@3sixty/api-auth-oauth-connector-entity-storage";
import type { IGoogleOAuthProviderConnectorConstructorOptions } from "@3sixty/api-auth-oauth-connector-google";
import type { IMicrosoftOAuthProviderConnectorConstructorOptions } from "@3sixty/api-auth-oauth-connector-microsoft";
import type { AuthenticationProviderType } from "../types/authenticationProviderType.js";

/**
 * Authentication provider config types.
 */
export type AuthenticationProviderConfig =
	| {
			type: typeof AuthenticationProviderType.ThreeSixty;
			options?: IEntityStorageAuthenticationProviderConnectorConstructorOptions;
	  }
	| {
			type: typeof AuthenticationProviderType.ThreeSixtyOAuth;
			options: IEntityStorageOAuthProviderConnectorConstructorOptions;
	  }
	| {
			type: typeof AuthenticationProviderType.Google;
			options: IGoogleOAuthProviderConnectorConstructorOptions;
	  }
	| {
			type: typeof AuthenticationProviderType.Microsoft;
			options: IMicrosoftOAuthProviderConnectorConstructorOptions;
	  };
