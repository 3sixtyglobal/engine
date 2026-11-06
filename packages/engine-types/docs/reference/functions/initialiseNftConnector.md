# Function: initialiseNftConnector()

> **initialiseNftConnector**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`NftConnectorConfig`](../type-aliases/NftConnectorConfig.md), `Factory`\<`INftConnector`\>\>

Initialise the NFT connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`NftConnectorConfig`](../type-aliases/NftConnectorConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`NftConnectorConfig`](../type-aliases/NftConnectorConfig.md), `Factory`\<`INftConnector`\>\>

The instance created and the factory for it.
