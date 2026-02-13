# Function: initialiseNftComponent()

> **initialiseNftComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`NftComponentConfig`](../type-aliases/NftComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the NFT component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`NftComponentConfig`](../type-aliases/NftComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`NftComponentConfig`](../type-aliases/NftComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
