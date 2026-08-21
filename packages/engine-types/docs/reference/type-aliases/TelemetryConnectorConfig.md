# Type Alias: TelemetryConnectorConfig

> **TelemetryConnectorConfig** = \{ `type`: *typeof* [`EntityStorage`](../variables/TelemetryConnectorType.md#entitystorage); `options?`: `IEntityStorageTelemetryConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`OpenTelemetry`](../variables/TelemetryConnectorType.md#opentelemetry); `options?`: `IOpenTelemetryTelemetryConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Multi`](../variables/TelemetryConnectorType.md#multi); `options`: `IMultiTelemetryConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Silent`](../variables/TelemetryConnectorType.md#silent); `options?`: `never`; \}

Telemetry connector config types.
