# Function: initialiseMessagingSmsConnector()

> **initialiseMessagingSmsConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MessagingSmsConnectorConfig`](../type-aliases/MessagingSmsConnectorConfig.md), `Factory`\<`IMessagingSmsConnector`\>\>

Initialise a messaging sms connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MessagingSmsConnectorConfig`](../type-aliases/MessagingSmsConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MessagingSmsConnectorConfig`](../type-aliases/MessagingSmsConnectorConfig.md), `Factory`\<`IMessagingSmsConnector`\>\>

The instance created and the factory for it.
