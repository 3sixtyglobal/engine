# Function: initialiseSchemaVersionMigrationComponent()

> **initialiseSchemaVersionMigrationComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`SchemaVersionMigrationComponentConfig`](../type-aliases/SchemaVersionMigrationComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the schema version migration component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`SchemaVersionMigrationComponentConfig`](../type-aliases/SchemaVersionMigrationComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`SchemaVersionMigrationComponentConfig`](../type-aliases/SchemaVersionMigrationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
