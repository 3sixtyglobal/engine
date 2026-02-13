# Function: initialiseBlobStorageConnector()

> **initialiseBlobStorageConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`BlobStorageConnectorConfig`](../type-aliases/BlobStorageConnectorConfig.md), `Factory`\<`IBlobStorageConnector`\>\>

Initialise the blob storage connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`BlobStorageConnectorConfig`](../type-aliases/BlobStorageConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`BlobStorageConnectorConfig`](../type-aliases/BlobStorageConnectorConfig.md), `Factory`\<`IBlobStorageConnector`\>\>

The instance created and the factory for it.
