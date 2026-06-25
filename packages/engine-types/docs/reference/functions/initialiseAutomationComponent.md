# Function: initialiseAutomationComponent()

> **initialiseAutomationComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`AutomationComponentConfig`](../type-aliases/AutomationComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the automation component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`AutomationComponentConfig`](../type-aliases/AutomationComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`AutomationComponentConfig`](../type-aliases/AutomationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
