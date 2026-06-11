# Function: initialisePlatformComponent()

> **initialisePlatformComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`PlatformComponentConfig`](../type-aliases/PlatformComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the platform component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`PlatformComponentConfig`](../type-aliases/PlatformComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`PlatformComponentConfig`](../type-aliases/PlatformComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
