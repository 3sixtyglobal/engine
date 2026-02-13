# Function: initialiseDataProcessingComponent()

> **initialiseDataProcessingComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`DataProcessingComponentConfig`](../type-aliases/DataProcessingComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the data processing component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`DataProcessingComponentConfig`](../type-aliases/DataProcessingComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`DataProcessingComponentConfig`](../type-aliases/DataProcessingComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
