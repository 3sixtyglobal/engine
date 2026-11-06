# Function: initialiseMessagingEmailConnector()

> **initialiseMessagingEmailConnector**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`MessagingEmailConnectorConfig`](../type-aliases/MessagingEmailConnectorConfig.md), `Factory`\<`IMessagingEmailConnector`\>\>

Initialise a messaging email connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MessagingEmailConnectorConfig`](../type-aliases/MessagingEmailConnectorConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`MessagingEmailConnectorConfig`](../type-aliases/MessagingEmailConnectorConfig.md), `Factory`\<`IMessagingEmailConnector`\>\>

The instance created and the factory for it.
