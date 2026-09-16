# Function: initialiseMailStorageComponent()

> **initialiseMailStorageComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MailStorageComponentConfig`](../type-aliases/MailStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the mail storage component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MailStorageComponentConfig`](../type-aliases/MailStorageComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MailStorageComponentConfig`](../type-aliases/MailStorageComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
