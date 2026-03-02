# Function: initialiseMessagingPushNotificationConnector()

> **initialiseMessagingPushNotificationConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MessagingPushNotificationConnectorConfig`](../type-aliases/MessagingPushNotificationConnectorConfig.md), `Factory`\<`IMessagingPushNotificationsConnector`\>\>

Initialise a messaging push notification connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MessagingPushNotificationConnectorConfig`](../type-aliases/MessagingPushNotificationConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MessagingPushNotificationConnectorConfig`](../type-aliases/MessagingPushNotificationConnectorConfig.md), `Factory`\<`IMessagingPushNotificationsConnector`\>\>

The instance created and the factory for it.
