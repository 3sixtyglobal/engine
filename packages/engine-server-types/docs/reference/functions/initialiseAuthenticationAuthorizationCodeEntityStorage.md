# Function: initialiseAuthenticationAuthorizationCodeEntityStorage()

> **initialiseAuthenticationAuthorizationCodeEntityStorage**(`engineCore`, `context`, `storageType`): `void`

Initialise the entity storage of the OAuth 2.0 authorization codes of password accounts,
partitioned like the accounts they belong to.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### storageType

`string` \| `undefined`

The configured storage type.

## Returns

`void`
