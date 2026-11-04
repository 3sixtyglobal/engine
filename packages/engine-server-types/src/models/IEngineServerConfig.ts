// Copyright 2024 IOTA Stiftung.
// Copyright 2026 3Sixty Trade Ltd.
// SPDX-License-Identifier: Apache-2.0.
import type { IWebServerOptions } from "@3sixty/api-models";
import type { IEngineCoreTypeConfig } from "@3sixty/engine-models";
import type { IEngineConfig } from "@3sixty/engine-types";
import type { AuthenticationAccountAdminComponentConfig } from "./config/authenticationAccountAdminComponentConfig.js";
import type { AuthenticationAccountComponentConfig } from "./config/authenticationAccountComponentConfig.js";
import type { AuthenticationAdminComponentConfig } from "./config/authenticationAdminComponentConfig.js";
import type { AuthenticationAuditComponentConfig } from "./config/authenticationAuditComponentConfig.js";
import type { AuthenticationComponentConfig } from "./config/authenticationComponentConfig.js";
import type { AuthenticationProviderConfig } from "./config/authenticationProviderConfig.js";
import type { AuthenticationRateComponentConfig } from "./config/authenticationRateComponentConfig.js";
import type { FeatureComponentConfig } from "./config/featureComponentConfig.js";
import type { InformationComponentConfig } from "./config/informationComponentConfig.js";
import type { MimeTypeProcessorConfig } from "./config/mimeTypeProcessorConfig.js";
import type { OAuthComponentConfig } from "./config/oauthComponentConfig.js";
import type { OrganizationComponentConfig } from "./config/organizationComponentConfig.js";
import type { OrganizationRequestAdminComponentConfig } from "./config/organizationRequestAdminComponentConfig.js";
import type { RestRouteProcessorConfig } from "./config/restRouteProcessorConfig.js";
import type { SocketRouteProcessorConfig } from "./config/socketRouteProcessorConfig.js";
import type { WebServerType } from "./types/webServerType.js";

/**
 * Extended engine server config with known types.
 */
export interface IEngineServerConfig extends IEngineConfig {
	/**
	 * The type of web server to use.
	 * @default fastify
	 */
	webServerType?: WebServerType;

	/**
	 * Configuration for the web server.
	 */
	web?: IWebServerOptions;

	/**
	 * The types to initialise in the engine.
	 */
	types: IEngineConfig["types"] & {
		[type: string]: IEngineCoreTypeConfig[] | undefined;

		/**
		 * Information component options which can be overridden by individual components by specifying types other than default.
		 */
		informationComponent?: IEngineCoreTypeConfig<InformationComponentConfig>[];

		/**
		 * REST route processors options which can be overridden by individual components by specifying types other than default.
		 */
		restRouteProcessor?: IEngineCoreTypeConfig<RestRouteProcessorConfig>[];

		/**
		 * Socket route processors options which can be overridden by individual components by specifying types other than default.
		 */
		socketRouteProcessor?: IEngineCoreTypeConfig<SocketRouteProcessorConfig>[];

		/**
		 * Mime type processors options which can be overridden by individual components by specifying types other than default.
		 */
		mimeTypeProcessor?: IEngineCoreTypeConfig<MimeTypeProcessorConfig>[];

		/**
		 * Authentication audit component options which can be overridden by individual components by specifying types other than default.
		 */
		authenticationAuditComponent?: IEngineCoreTypeConfig<AuthenticationAuditComponentConfig>[];

		/**
		 * Authentication rate component options which can be overridden by individual components by specifying types other than default.
		 */
		authenticationRateComponent?: IEngineCoreTypeConfig<AuthenticationRateComponentConfig>[];

		/**
		 * Feature component options which can be overridden by individual components by specifying types other than default.
		 */
		featureComponent?: IEngineCoreTypeConfig<FeatureComponentConfig>[];

		/**
		 * Authentication component options which can be overridden by individual components by specifying types other than default.
		 */
		authenticationComponent?: IEngineCoreTypeConfig<AuthenticationComponentConfig>[];

		/**
		 * Authentication admin component options which can be overridden by individual components by specifying types other than default.
		 */
		authenticationAdminComponent?: IEngineCoreTypeConfig<AuthenticationAdminComponentConfig>[];

		/**
		 * Authentication providers, each registered under its authentication provider id.
		 */
		authenticationProvider?: IEngineCoreTypeConfig<AuthenticationProviderConfig>[];

		/**
		 * Authentication account component options, for the data stored against the signed in account.
		 */
		authenticationAccountComponent?: IEngineCoreTypeConfig<AuthenticationAccountComponentConfig>[];

		/**
		 * Authentication account admin component options, for the data stored against any account.
		 */
		authenticationAccountAdminComponent?: IEngineCoreTypeConfig<AuthenticationAccountAdminComponentConfig>[];

		/**
		 * Organization request admin component options, for reviewing the requests to join an organization.
		 */
		organizationRequestAdminComponent?: IEngineCoreTypeConfig<OrganizationRequestAdminComponentConfig>[];

		/**
		 * Organization component options, for the organizations registered on the node and their profiles.
		 */
		organizationComponent?: IEngineCoreTypeConfig<OrganizationComponentConfig>[];

		/**
		 * OAuth sign in component options which can be overridden by individual components by specifying types other than default.
		 */
		oauthComponent?: IEngineCoreTypeConfig<OAuthComponentConfig>[];
	};
}
