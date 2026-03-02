# Function: initialiseEventBusComponent()

> **initialiseEventBusComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`EventBusComponentConfig`](../type-aliases/EventBusComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the event bus component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`EventBusComponentConfig`](../type-aliases/EventBusComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`EventBusComponentConfig`](../type-aliases/EventBusComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
