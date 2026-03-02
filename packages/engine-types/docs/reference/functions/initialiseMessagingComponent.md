# Function: initialiseMessagingComponent()

> **initialiseMessagingComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MessagingComponentConfig`](../type-aliases/MessagingComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the messaging component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MessagingComponentConfig`](../type-aliases/MessagingComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MessagingComponentConfig`](../type-aliases/MessagingComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
