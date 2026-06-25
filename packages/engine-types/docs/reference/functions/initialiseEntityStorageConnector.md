# Function: initialiseEntityStorageConnector()

> **initialiseEntityStorageConnector**(`engineCore`, `context`, `typeCustom`, `schema`, `partitionContextIds`): `void`

Initialise the entity storage connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### typeCustom

`string` \| `undefined`

Override the type of connector to use instead of default configuration.

### schema

`string`

The schema for the entity storage.

### partitionContextIds

`string`[]

The context IDs to use for partitioning the data.

## Returns

`void`

## Throws

GeneralError when the configuration is invalid.
