# Function: initialiseDataSpaceConnectorComponent()

> **initialiseDataSpaceConnectorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`DataSpaceConnectorComponentConfig`](../type-aliases/DataSpaceConnectorComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the data space connector component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`DataSpaceConnectorComponentConfig`](../type-aliases/DataSpaceConnectorComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`DataSpaceConnectorComponentConfig`](../type-aliases/DataSpaceConnectorComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
