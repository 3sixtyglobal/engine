# Function: initialiseFacade()

> **initialiseFacade**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`FacadeConfig`](../type-aliases/FacadeConfig.md), `Factory`\<`IFacade`\<`unknown`\>\>\>

Initialise a facade.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`FacadeConfig`](../type-aliases/FacadeConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`FacadeConfig`](../type-aliases/FacadeConfig.md), `Factory`\<`IFacade`\<`unknown`\>\>\>

The instance created and the factory for it.
