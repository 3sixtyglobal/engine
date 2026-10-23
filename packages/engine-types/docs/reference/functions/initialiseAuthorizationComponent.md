# Function: initialiseAuthorizationComponent()

> **initialiseAuthorizationComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AuthorizationComponentConfig`](../type-aliases/AuthorizationComponentConfig.md), `Factory`\<`IComponent`\>\>

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

`EngineTypeInitialiserReturn`\<[`AuthorizationComponentConfig`](../type-aliases/AuthorizationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
