# Function: initialiseLoggingComponent()

> **initialiseLoggingComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`LoggingComponentConfig`](../type-aliases/LoggingComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the logging component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`LoggingComponentConfig`](../type-aliases/LoggingComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`LoggingComponentConfig`](../type-aliases/LoggingComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
