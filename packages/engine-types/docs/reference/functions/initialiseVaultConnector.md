# Function: initialiseVaultConnector()

> **initialiseVaultConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`VaultConnectorConfig`](../type-aliases/VaultConnectorConfig.md), `Factory`\<`IVaultConnector`\>\>

Initialise the vault connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`VaultConnectorConfig`](../type-aliases/VaultConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`VaultConnectorConfig`](../type-aliases/VaultConnectorConfig.md), `Factory`\<`IVaultConnector`\>\>

The instance created and the factory for it.
