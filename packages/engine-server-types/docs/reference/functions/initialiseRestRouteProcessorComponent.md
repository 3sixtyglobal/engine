# Function: initialiseRestRouteProcessorComponent()

> **initialiseRestRouteProcessorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RestRouteProcessorConfig`](../type-aliases/RestRouteProcessorConfig.md), `Factory`\<`IRestRouteProcessor`\>\>

Initialise the rest route processor.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`RestRouteProcessorConfig`](../type-aliases/RestRouteProcessorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`RestRouteProcessorConfig`](../type-aliases/RestRouteProcessorConfig.md), `Factory`\<`IRestRouteProcessor`\>\>

The instance created and the factory for it.
