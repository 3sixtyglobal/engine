# Function: initialiseAuthorizationConnector()

> **initialiseAuthorizationConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AuthorizationConnectorConfig`](../type-aliases/AuthorizationConnectorConfig.md), `Factory`\<`IAuthorizationConnector`\>\>

Initialise the authorization connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`AuthorizationConnectorConfig`](../type-aliases/AuthorizationConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AuthorizationConnectorConfig`](../type-aliases/AuthorizationConnectorConfig.md), `Factory`\<`IAuthorizationConnector`\>\>

The instance created and the factory for it.
