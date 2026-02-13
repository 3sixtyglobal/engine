# Function: initialiseEntityStorageComponent()

> **initialiseEntityStorageComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`EntityStorageComponentConfig`](../type-aliases/EntityStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the entity storage connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`EntityStorageComponentConfig`](../type-aliases/EntityStorageComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`EntityStorageComponentConfig`](../type-aliases/EntityStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
