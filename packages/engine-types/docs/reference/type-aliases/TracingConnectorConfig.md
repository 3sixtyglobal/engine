# Type Alias: TracingConnectorConfig

> **TracingConnectorConfig** = \{ `type`: *typeof* [`EntityStorage`](../variables/TracingConnectorType.md#entitystorage); `options?`: `IEntityStorageTracingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`OpenTelemetry`](../variables/TracingConnectorType.md#opentelemetry); `options?`: `IOpenTelemetryTracingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Multi`](../variables/TracingConnectorType.md#multi); `options`: `IMultiTracingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Silent`](../variables/TracingConnectorType.md#silent); `options?`: `never`; \}

Tracing connector config types.
