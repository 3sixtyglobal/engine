# Function: initialiseOrganizationEntityStorage()

> **initialiseOrganizationEntityStorage**(`engineCore`, `context`, `storageType`): `void`

Initialise the entity storage of the registered organizations, inside the tenant partition like
the accounts that join them. Every component that checks an organization is registered
initialises it, so the check never runs against missing storage.

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
