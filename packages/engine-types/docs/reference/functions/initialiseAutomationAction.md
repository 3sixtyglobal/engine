# Function: initialiseAutomationAction()

> **initialiseAutomationAction**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AutomationActionConfig`](../type-aliases/AutomationActionConfig.md), `Factory`\<`IAutomationAction`\>\>

Initialise the automation actions.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`AutomationActionConfig`](../type-aliases/AutomationActionConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AutomationActionConfig`](../type-aliases/AutomationActionConfig.md), `Factory`\<`IAutomationAction`\>\>

The instance created and the factory for it.
