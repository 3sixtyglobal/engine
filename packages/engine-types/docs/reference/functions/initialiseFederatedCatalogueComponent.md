# Function: initialiseFederatedCatalogueComponent()

> **initialiseFederatedCatalogueComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`FederatedCatalogueComponentConfig`](../type-aliases/FederatedCatalogueComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the federated catalogue component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`FederatedCatalogueComponentConfig`](../type-aliases/FederatedCatalogueComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`FederatedCatalogueComponentConfig`](../type-aliases/FederatedCatalogueComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
