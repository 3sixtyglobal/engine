# Type Alias: LoggingConnectorConfig

> **LoggingConnectorConfig** = \{ `type`: *typeof* [`EntityStorage`](../variables/LoggingConnectorType.md#entitystorage); `options?`: `IEntityStorageLoggingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Console`](../variables/LoggingConnectorType.md#console); `options?`: `IConsoleLoggingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Multi`](../variables/LoggingConnectorType.md#multi); `options`: `IMultiLoggingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`OpenTelemetry`](../variables/LoggingConnectorType.md#opentelemetry); `options?`: `IOpenTelemetryLoggingConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`File`](../variables/LoggingConnectorType.md#file); `options`: `IFileLoggingConnectorConstructorOptions`; \}

Logging config connector types.
