# Function: initialiseOrganizationComponent()

> **initialiseOrganizationComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`OrganizationComponentConfig`](../type-aliases/OrganizationComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the organization component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`OrganizationComponentConfig`](../type-aliases/OrganizationComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`OrganizationComponentConfig`](../type-aliases/OrganizationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
