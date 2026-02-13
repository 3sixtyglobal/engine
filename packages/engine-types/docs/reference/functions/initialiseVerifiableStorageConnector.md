# Function: initialiseVerifiableStorageConnector()

> **initialiseVerifiableStorageConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`VerifiableStorageConnectorConfig`](../type-aliases/VerifiableStorageConnectorConfig.md), `Factory`\<`IVerifiableStorageConnector`\>\>

Initialise the verifiable storage connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`VerifiableStorageConnectorConfig`](../type-aliases/VerifiableStorageConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`VerifiableStorageConnectorConfig`](../type-aliases/VerifiableStorageConnectorConfig.md), `Factory`\<`IVerifiableStorageConnector`\>\>

The instance created and the factory for it.
