// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthHeaderProcessorConstructorOptions } from "@3sixty/api-auth-entity-storage-service";
import type { ITenantOverrideProcessorConstructorOptions } from "@3sixty/api-auth-service";
import type {
	IContextIdProcessorConstructorOptions,
	ILoggingProcessorConstructorOptions,
	ISocketRouteProcessorConstructorOptions,
	IStaticContextIdProcessorConstructorOptions
} from "@3sixty/api-processors";
import type {
	ISingleTenantProcessorConstructorOptions,
	ITenantProcessorConstructorOptions
} from "@3sixty/api-tenant-processor";
import type { IAuthorizationRouteProcessorConstructorOptions } from "@3sixty/authorization-service";
import type { SocketRouteProcessorType } from "../types/socketRouteProcessorType.js";

/**
 * Socket route processor config types.
 */
export type SocketRouteProcessorConfig =
	| {
			type: typeof SocketRouteProcessorType.AuthHeader;
			options?: IAuthHeaderProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.Logging;
			options?: ILoggingProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.ContextId;
			options: IContextIdProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.StaticContextId;
			options: IStaticContextIdProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.Tenant;
			options?: ITenantProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.SingleTenant;
			options?: ISingleTenantProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.TenantOverride;
			options?: ITenantOverrideProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.SocketRoute;
			options?: ISocketRouteProcessorConstructorOptions;
	  }
	| {
			type: typeof SocketRouteProcessorType.Authorization;
			options?: IAuthorizationRouteProcessorConstructorOptions;
	  };
