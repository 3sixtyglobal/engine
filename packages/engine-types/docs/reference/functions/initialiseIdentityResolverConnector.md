# Function: initialiseIdentityResolverConnector()

> **initialiseIdentityResolverConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`IdentityResolverConnectorConfig`](../type-aliases/IdentityResolverConnectorConfig.md), `Factory`\<`IIdentityResolverConnector`\>\>

Initialise the identity resolver connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`IdentityResolverConnectorConfig`](../type-aliases/IdentityResolverConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`IdentityResolverConnectorConfig`](../type-aliases/IdentityResolverConnectorConfig.md), `Factory`\<`IIdentityResolverConnector`\>\>

The instance created and the factory for it.
