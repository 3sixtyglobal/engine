# Function: initialiseDataspaceDataPlaneComponent()

> **initialiseDataspaceDataPlaneComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`DataspaceDataPlaneComponentConfig`](../type-aliases/DataspaceDataPlaneComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the dataspace data plane component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`DataspaceDataPlaneComponentConfig`](../type-aliases/DataspaceDataPlaneComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`DataspaceDataPlaneComponentConfig`](../type-aliases/DataspaceDataPlaneComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
