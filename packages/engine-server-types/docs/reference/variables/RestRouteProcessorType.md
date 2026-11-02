# Variable: RestRouteProcessorType

> `const` **RestRouteProcessorType**: `object`

REST route processor types.

## Type Declaration

### AuthHeader {#authheader}

> `readonly` **AuthHeader**: `"auth-header"` = `"auth-header"`

Auth header.

### AuthenticationAccount {#authenticationaccount}

> `readonly` **AuthenticationAccount**: `"authentication-account"` = `"authentication-account"`

Authentication account, sets the identity and organization of the signed in account.

### Logging {#logging}

> `readonly` **Logging**: `"logging"` = `"logging"`

Logging.

### ContextId {#contextid}

> `readonly` **ContextId**: `"context-id"` = `"context-id"`

Context ID.

### StaticContextId {#staticcontextid}

> `readonly` **StaticContextId**: `"static-context-id"` = `"static-context-id"`

Static Context ID.

### Tenant {#tenant}

> `readonly` **Tenant**: `"tenant"` = `"tenant"`

Tenant.

### SingleTenant {#singletenant}

> `readonly` **SingleTenant**: `"single-tenant"` = `"single-tenant"`

Single Tenant.

### TenantOverride {#tenantoverride}

> `readonly` **TenantOverride**: `"tenant-override"` = `"tenant-override"`

Tenant override.

### RestRoute {#restroute}

> `readonly` **RestRoute**: `"rest-route"` = `"rest-route"`

REST Route.

### Metrics {#metrics}

> `readonly` **Metrics**: `"metrics"` = `"metrics"`

Metrics.

### Tracing {#tracing}

> `readonly` **Tracing**: `"tracing"` = `"tracing"`

Tracing.

### Authorization {#authorization}

> `readonly` **Authorization**: `"authorization"` = `"authorization"`

Authorization.

### OriginCheck {#origincheck}

> `readonly` **OriginCheck**: `"origin-check"` = `"origin-check"`

Origin check, rejects cookie authenticated state changing requests from other origins.
