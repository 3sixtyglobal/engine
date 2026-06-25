# Function: initialiseNotarizationConnector()

> **initialiseNotarizationConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`NotarizationConnectorConfig`](../type-aliases/NotarizationConnectorConfig.md), `Factory`\<`INotarizationConnector`\>\>

Initialise the notarization connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`NotarizationConnectorConfig`](../type-aliases/NotarizationConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`NotarizationConnectorConfig`](../type-aliases/NotarizationConnectorConfig.md), `Factory`\<`INotarizationConnector`\>\>

The instance created and the factory for it.
