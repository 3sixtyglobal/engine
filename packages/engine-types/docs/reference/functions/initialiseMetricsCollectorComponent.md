# Function: initialiseMetricsCollectorComponent()

> **initialiseMetricsCollectorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MetricsCollectorComponentConfig`](../type-aliases/MetricsCollectorComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the metrics collector orchestrator component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MetricsCollectorComponentConfig`](../type-aliases/MetricsCollectorComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MetricsCollectorComponentConfig`](../type-aliases/MetricsCollectorComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
