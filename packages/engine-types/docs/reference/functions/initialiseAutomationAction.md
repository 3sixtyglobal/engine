# Function: initialiseAutomationAction()

> **initialiseAutomationAction**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`AutomationActionConfig`](../type-aliases/AutomationActionConfig.md), `Factory`\<`IAutomationAction`\>\>

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

`IEngineTypeInitialiserReturn`\<[`AutomationActionConfig`](../type-aliases/AutomationActionConfig.md), `Factory`\<`IAutomationAction`\>\>

The instance created and the factory for it.
