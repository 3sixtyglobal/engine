# Function: initialiseRightsManagementPolicyArbiterComponent()

> **initialiseRightsManagementPolicyArbiterComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyArbiter`\>; `component?`: `IComponent`; \}\>

Initialise the rights management policy arbiter component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementPolicyArbiterComponentConfig`](../type-aliases/RightsManagementPolicyArbiterComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyArbiter`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
