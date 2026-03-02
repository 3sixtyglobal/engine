# Function: initialiseIdentityResolverComponent()

> **initialiseIdentityResolverComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`IdentityResolverComponentConfig`](../type-aliases/IdentityResolverComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the identity resolver component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`IdentityResolverComponentConfig`](../type-aliases/IdentityResolverComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`IdentityResolverComponentConfig`](../type-aliases/IdentityResolverComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
