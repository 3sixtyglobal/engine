# Function: initialiseFaucetConnector()

> **initialiseFaucetConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`FaucetConnectorConfig`](../type-aliases/FaucetConnectorConfig.md), `Factory`\<`IFaucetConnector`\>\>

Initialise a faucet connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`FaucetConnectorConfig`](../type-aliases/FaucetConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`FaucetConnectorConfig`](../type-aliases/FaucetConnectorConfig.md), `Factory`\<`IFaucetConnector`\>\>

The instance created and the factory for it.
