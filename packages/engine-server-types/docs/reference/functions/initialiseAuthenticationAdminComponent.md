# Function: initialiseAuthenticationAdminComponent()

> **initialiseAuthenticationAdminComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AuthenticationAdminComponentConfig`](../type-aliases/AuthenticationAdminComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the authentication admin.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthenticationAdminComponentConfig`](../type-aliases/AuthenticationAdminComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AuthenticationAdminComponentConfig`](../type-aliases/AuthenticationAdminComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
