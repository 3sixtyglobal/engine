# Function: initialiseAttestationConnector()

> **initialiseAttestationConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AttestationConnectorConfig`](../type-aliases/AttestationConnectorConfig.md), `Factory`\<`IAttestationConnector`\>\>

Initialise the attestation connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`AttestationConnectorConfig`](../type-aliases/AttestationConnectorConfig.md)

The instance config type.

## Returns

`EngineTypeInitialiserReturn`\<[`AttestationConnectorConfig`](../type-aliases/AttestationConnectorConfig.md), `Factory`\<`IAttestationConnector`\>\>

The instance created and the factory for it.
