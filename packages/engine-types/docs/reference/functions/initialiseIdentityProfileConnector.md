# Function: initialiseIdentityProfileConnector()

> **initialiseIdentityProfileConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`IdentityProfileConnectorConfig`](../type-aliases/IdentityProfileConnectorConfig.md), `Factory`\<`IIdentityProfileConnector`\<`IJsonLdDocument`, `IJsonLdDocument`\>\>\>

Initialise the identity profile connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`IdentityProfileConnectorConfig`](../type-aliases/IdentityProfileConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`IdentityProfileConnectorConfig`](../type-aliases/IdentityProfileConnectorConfig.md), `Factory`\<`IIdentityProfileConnector`\<`IJsonLdDocument`, `IJsonLdDocument`\>\>\>

The instance created and the factory for it.
