# Function: initialiseTracingConnector()

> **initialiseTracingConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`TracingConnectorConfig`](../type-aliases/TracingConnectorConfig.md), `Factory`\<`ITracingConnector`\>\>

Initialise a tracing connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TracingConnectorConfig`](../type-aliases/TracingConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`TracingConnectorConfig`](../type-aliases/TracingConnectorConfig.md), `Factory`\<`ITracingConnector`\>\>

The instance created and the factory for it.
