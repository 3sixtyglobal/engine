# Function: initialiseTracingComponent()

> **initialiseTracingComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`TracingComponentConfig`](../type-aliases/TracingComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the tracing component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TracingComponentConfig`](../type-aliases/TracingComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`TracingComponentConfig`](../type-aliases/TracingComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
