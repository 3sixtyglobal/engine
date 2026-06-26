# Type Alias: LoggingConnectorConfig

> **LoggingConnectorConfig** = \{ `type`: *typeof* [`EntityStorage`](../variables/LoggingConnectorType.md#entitystorage); `options?`: `IEntityStorageLoggingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Console`](../variables/LoggingConnectorType.md#console); `options?`: `IConsoleLoggingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Multi`](../variables/LoggingConnectorType.md#multi); `options`: `IMultiLoggingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Otel`](../variables/LoggingConnectorType.md#otel); `options?`: `IOpenTelemetryLoggingConnectorConstructorOptions`; \}

Logging config connector types.
