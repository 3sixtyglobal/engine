# Function: initialiseFederatedCatalogueFilterComponent()

> **initialiseFederatedCatalogueFilterComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IFederatedCatalogueFilter`\>; `component?`: `IComponent`; \}\>

Initialise the federated catalogue filter component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`FederatedCatalogueFilterComponentConfig`](../type-aliases/FederatedCatalogueFilterComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IFederatedCatalogueFilter`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
