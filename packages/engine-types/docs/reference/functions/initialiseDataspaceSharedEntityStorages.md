# Function: initialiseDataspaceSharedEntityStorages()

> **initialiseDataspaceSharedEntityStorages**(`engineCore`, `context`, `transferProcessEntityStorageType`, `dataspaceAppDatasetEntityStorageType`, `transferRetrievalEntityStorageType?`): `void`

Initialise the shared entity storages used by both control and data plane services.
Both planes must register the same connector name with the same partition keys,
otherwise initialiseEntityStorageConnector silently drops the second registration
and the two layers disagree on where records live.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### transferProcessEntityStorageType

`string` \| `undefined`

The entity storage type for transfer processes.

### dataspaceAppDatasetEntityStorageType

`string` \| `undefined`

The entity storage type for dataspace app datasets.

### transferRetrievalEntityStorageType?

`string`

The entity storage type for transfer retrievals.

## Returns

`void`
