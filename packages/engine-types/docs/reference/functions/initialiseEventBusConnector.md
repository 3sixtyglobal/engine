# Function: initialiseEventBusConnector()

> **initialiseEventBusConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`EventBusConnectorConfig`](../type-aliases/EventBusConnectorConfig.md), `Factory`\<`IEventBusConnector`\>\>

Initialise a event bus connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`EventBusConnectorConfig`](../type-aliases/EventBusConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`EventBusConnectorConfig`](../type-aliases/EventBusConnectorConfig.md), `Factory`\<`IEventBusConnector`\>\>

The instance created and the factory for it.
