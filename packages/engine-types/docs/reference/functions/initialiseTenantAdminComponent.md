# Function: initialiseTenantAdminComponent()

> **initialiseTenantAdminComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`TenantAdminComponentConfig`](../type-aliases/TenantAdminComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the tenant admin component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.s

### instanceConfig

[`TenantAdminComponentConfig`](../type-aliases/TenantAdminComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`TenantAdminComponentConfig`](../type-aliases/TenantAdminComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
