# Function: initialiseDataspaceControlPlaneComponent()

> **initialiseDataspaceControlPlaneComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`DataspaceControlPlaneComponentConfig`](../type-aliases/DataspaceControlPlaneComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the dataspace control plane component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`DataspaceControlPlaneComponentConfig`](../type-aliases/DataspaceControlPlaneComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`DataspaceControlPlaneComponentConfig`](../type-aliases/DataspaceControlPlaneComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
