# Function: initialiseTenantAdminComponent()

> **initialiseTenantAdminComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`TenantAdminComponentConfig`](../type-aliases/TenantAdminComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the tenant admin component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TenantAdminComponentConfig`](../type-aliases/TenantAdminComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`TenantAdminComponentConfig`](../type-aliases/TenantAdminComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
