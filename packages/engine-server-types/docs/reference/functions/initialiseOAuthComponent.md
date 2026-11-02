# Function: initialiseOAuthComponent()

> **initialiseOAuthComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`OAuthComponentConfig`](../type-aliases/OAuthComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the OAuth sign in component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`OAuthComponentConfig`](../type-aliases/OAuthComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`OAuthComponentConfig`](../type-aliases/OAuthComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
