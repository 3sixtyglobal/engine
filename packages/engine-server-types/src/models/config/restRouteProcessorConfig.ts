// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthHeaderProcessorConstructorOptions } from "@twin.org/api-auth-entity-storage-service";
import type {
	IContextIdProcessorConstructorOptions,
	ILoggingProcessorConstructorOptions,
	IRestRouteProcessorConstructorOptions,
	IStaticContextIdProcessorConstructorOptions
} from "@twin.org/api-processors";
import type {
	ISingleTenantProcessorConstructorOptions,
	ITenantProcessorConstructorOptions,
	ITenantOverrideProcessorConstructorOptions
} from "@twin.org/api-tenant-processor";
import type { RestRouteProcessorType } from "../types/restRouteProcessorType.js";

/**
 * REST route processor config types.
 */
export type RestRouteProcessorConfig =
	| {
			type: typeof RestRouteProcessorType.AuthHeader;
			options?: IAuthHeaderProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.Logging;
			options?: ILoggingProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.ContextId;
			options: IContextIdProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.StaticContextId;
			options: IStaticContextIdProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.Tenant;
			options?: ITenantProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.SingleTenant;
			options?: ISingleTenantProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.TenantOverride;
			options?: ITenantOverrideProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.RestRoute;
			options?: IRestRouteProcessorConstructorOptions;
	  };
