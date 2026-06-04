# Function: initialiseTenantComponent()

> **initialiseTenantComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`TenantComponentConfig`](../type-aliases/TenantComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the tenant component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TenantComponentConfig`](../type-aliases/TenantComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`TenantComponentConfig`](../type-aliases/TenantComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
