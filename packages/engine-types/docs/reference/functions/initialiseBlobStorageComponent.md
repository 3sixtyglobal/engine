# Function: initialiseBlobStorageComponent()

> **initialiseBlobStorageComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`BlobStorageComponentConfig`](../type-aliases/BlobStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the blob storage component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`BlobStorageComponentConfig`](../type-aliases/BlobStorageComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`BlobStorageComponentConfig`](../type-aliases/BlobStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
