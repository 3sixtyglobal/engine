# Function: initialiseSocketRouteProcessorComponent()

> **initialiseSocketRouteProcessorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`SocketRouteProcessorConfig`](../type-aliases/SocketRouteProcessorConfig.md), `Factory`\<`ISocketRouteProcessor`\>\>

Initialise the socket route processor.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`SocketRouteProcessorConfig`](../type-aliases/SocketRouteProcessorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`SocketRouteProcessorConfig`](../type-aliases/SocketRouteProcessorConfig.md), `Factory`\<`ISocketRouteProcessor`\>\>

The instance created and the factory for it.
