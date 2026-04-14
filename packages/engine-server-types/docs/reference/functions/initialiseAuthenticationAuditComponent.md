# Function: initialiseAuthenticationAuditComponent()

> **initialiseAuthenticationAuditComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AuthenticationAuditComponentConfig`](../type-aliases/AuthenticationAuditComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the authentication audit.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthenticationAuditComponentConfig`](../type-aliases/AuthenticationAuditComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AuthenticationAuditComponentConfig`](../type-aliases/AuthenticationAuditComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
