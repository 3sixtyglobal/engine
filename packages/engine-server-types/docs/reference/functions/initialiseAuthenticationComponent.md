# Function: initialiseAuthenticationComponent()

> **initialiseAuthenticationComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AuthenticationComponentConfig`](../type-aliases/AuthenticationComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the authentication.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthenticationComponentConfig`](../type-aliases/AuthenticationComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AuthenticationComponentConfig`](../type-aliases/AuthenticationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
