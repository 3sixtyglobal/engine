// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthHeaderProcessorConstructorOptions } from "@3sixty/api-auth-entity-storage-service";
import type {
	IContextIdProcessorConstructorOptions,
	ILoggingProcessorConstructorOptions,
	IRestRouteProcessorConstructorOptions,
	IStaticContextIdProcessorConstructorOptions
} from "@3sixty/api-processors";
import type {
	ISingleTenantProcessorConstructorOptions,
	ITenantOverrideProcessorConstructorOptions,
	ITenantProcessorConstructorOptions
} from "@3sixty/api-tenant-processor";
import type { IMetricsRouteProcessorConstructorOptions } from "@3sixty/telemetry-processors";
import type { ITracingRouteProcessorConstructorOptions } from "@3sixty/tracing-processors";
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
			type: typeof RestRouteProcessorType.Metrics;
			options?: IMetricsRouteProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.RestRoute;
			options?: IRestRouteProcessorConstructorOptions;
	  }
	| {
			type: typeof RestRouteProcessorType.Tracing;
			options?: ITracingRouteProcessorConstructorOptions;
	  };
