# Function: initialiseAuthenticationAccountComponent()

> **initialiseAuthenticationAccountComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AuthenticationAccountComponentConfig`](../type-aliases/AuthenticationAccountComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the authentication account component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthenticationAccountComponentConfig`](../type-aliases/AuthenticationAccountComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AuthenticationAccountComponentConfig`](../type-aliases/AuthenticationAccountComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
