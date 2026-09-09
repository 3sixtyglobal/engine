# Function: initialiseMailboxComponent()

> **initialiseMailboxComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MailboxComponentConfig`](../type-aliases/MailboxComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the mailbox component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MailboxComponentConfig`](../type-aliases/MailboxComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MailboxComponentConfig`](../type-aliases/MailboxComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
