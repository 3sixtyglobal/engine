# Function: initialiseHealthComponent()

> **initialiseHealthComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`HealthComponentConfig`](../type-aliases/HealthComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the health component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`HealthComponentConfig`](../type-aliases/HealthComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`HealthComponentConfig`](../type-aliases/HealthComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
