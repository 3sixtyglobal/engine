# Function: initialiseAuthenticationRateComponent()

> **initialiseAuthenticationRateComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AuthenticationRateComponentConfig`](../type-aliases/AuthenticationRateComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the authentication rate.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthenticationRateComponentConfig`](../type-aliases/AuthenticationRateComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AuthenticationRateComponentConfig`](../type-aliases/AuthenticationRateComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
