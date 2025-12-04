# Function: initialiseRightsManagementPolicyExecutionActionComponent()

> **initialiseRightsManagementPolicyExecutionActionComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyExecutionAction`\>; `component?`: `IComponent`; \}\>

Initialise the rights management policy execution action component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementPolicyExecutionActionComponentConfig`](../type-aliases/RightsManagementPolicyExecutionActionComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyExecutionAction`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
