# Function: initialiseAuthenticationProvider()

> **initialiseAuthenticationProvider**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`AuthenticationProviderConfig`](../type-aliases/AuthenticationProviderConfig.md), `Factory`\<`IAuthenticationProvider`\<`unknown`\>\>\>

Initialise an authentication provider, registered under its authentication provider id.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthenticationProviderConfig`](../type-aliases/AuthenticationProviderConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`AuthenticationProviderConfig`](../type-aliases/AuthenticationProviderConfig.md), `Factory`\<`IAuthenticationProvider`\<`unknown`\>\>\>

The instance created and the factory for it.
