# Function: initialiseIdentityConnector()

> **initialiseIdentityConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`IdentityConnectorConfig`](../type-aliases/IdentityConnectorConfig.md), `Factory`\<`IIdentityConnector`\>\>

Initialise the identity connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`IdentityConnectorConfig`](../type-aliases/IdentityConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`IdentityConnectorConfig`](../type-aliases/IdentityConnectorConfig.md), `Factory`\<`IIdentityConnector`\>\>

The instance created and the factory for it.
