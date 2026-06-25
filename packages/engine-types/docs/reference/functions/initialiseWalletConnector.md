# Function: initialiseWalletConnector()

> **initialiseWalletConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md), `Factory`\<`IWalletConnector`\>\>

Initialise a wallet connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md), `Factory`\<`IWalletConnector`\>\>

The instance created and the factory for it.
