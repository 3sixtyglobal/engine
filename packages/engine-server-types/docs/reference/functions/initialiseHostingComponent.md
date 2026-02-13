# Function: initialiseHostingComponent()

> **initialiseHostingComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`HostingComponentConfig`](../type-aliases/HostingComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the hosting component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`HostingComponentConfig`](../type-aliases/HostingComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`HostingComponentConfig`](../type-aliases/HostingComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
