# Function: initialiseAuthorizationComponent()

> **initialiseAuthorizationComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`AuthorizationComponentConfig`](../type-aliases/AuthorizationComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the authorization component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthorizationComponentConfig`](../type-aliases/AuthorizationComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`AuthorizationComponentConfig`](../type-aliases/AuthorizationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
