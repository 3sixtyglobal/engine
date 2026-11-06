# Function: initialiseLoggingConnector()

> **initialiseLoggingConnector**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`LoggingConnectorConfig`](../type-aliases/LoggingConnectorConfig.md), `Factory`\<`ILoggingConnector`\>\>

Initialise the logging connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core context.

### instanceConfig

[`LoggingConnectorConfig`](../type-aliases/LoggingConnectorConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`LoggingConnectorConfig`](../type-aliases/LoggingConnectorConfig.md), `Factory`\<`ILoggingConnector`\>\>

The instance created and the factory for it.
