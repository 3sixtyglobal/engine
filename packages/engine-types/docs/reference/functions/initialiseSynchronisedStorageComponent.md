# Function: initialiseSynchronisedStorageComponent()

> **initialiseSynchronisedStorageComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`SynchronisedStorageComponentConfig`](../type-aliases/SynchronisedStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the synchronised storage component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`SynchronisedStorageComponentConfig`](../type-aliases/SynchronisedStorageComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`SynchronisedStorageComponentConfig`](../type-aliases/SynchronisedStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
