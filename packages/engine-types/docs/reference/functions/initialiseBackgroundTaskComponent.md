# Function: initialiseBackgroundTaskComponent()

> **initialiseBackgroundTaskComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`BackgroundTaskComponentConfig`](../type-aliases/BackgroundTaskComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise a background task component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`BackgroundTaskComponentConfig`](../type-aliases/BackgroundTaskComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`BackgroundTaskComponentConfig`](../type-aliases/BackgroundTaskComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
