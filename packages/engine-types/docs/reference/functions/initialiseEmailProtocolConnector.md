# Function: initialiseEmailProtocolConnector()

> **initialiseEmailProtocolConnector**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`EmailProtocolConnectorConfig`](../type-aliases/EmailProtocolConnectorConfig.md), `Factory`\<`IEmailProtocolConnector`\<`unknown`, `IEmailProtocolConnectorAuthState`\>\>\>

Initialise an email protocol connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`EmailProtocolConnectorConfig`](../type-aliases/EmailProtocolConnectorConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`EmailProtocolConnectorConfig`](../type-aliases/EmailProtocolConnectorConfig.md), `Factory`\<`IEmailProtocolConnector`\<`unknown`, `IEmailProtocolConnectorAuthState`\>\>\>

The instance created and the factory for it.
