# Function: initialiseDataConverterConnector()

> **initialiseDataConverterConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`DataConverterConnectorConfig`](../type-aliases/DataConverterConnectorConfig.md), `Factory`\<`IDataConverterConnector`\>\>

Initialise the data converter connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`DataConverterConnectorConfig`](../type-aliases/DataConverterConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`DataConverterConnectorConfig`](../type-aliases/DataConverterConnectorConfig.md), `Factory`\<`IDataConverterConnector`\>\>

The instance created and the factory for it.
