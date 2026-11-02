# Function: initialiseOrganizationRequestEntityStorage()

> **initialiseOrganizationRequestEntityStorage**(`engineCore`, `context`, `storageType`): `void`

Initialise the entity storage of the requests to join an organization, shared by every component
that uses it so the schema and partitions match.

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
