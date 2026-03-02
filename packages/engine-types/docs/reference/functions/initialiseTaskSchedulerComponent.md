# Function: initialiseTaskSchedulerComponent()

> **initialiseTaskSchedulerComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`TaskSchedulerComponentConfig`](../type-aliases/TaskSchedulerComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise a task scheduler.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TaskSchedulerComponentConfig`](../type-aliases/TaskSchedulerComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`TaskSchedulerComponentConfig`](../type-aliases/TaskSchedulerComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
