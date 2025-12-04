# Function: initialiseRightsManagementPolicyEnforcementProcessorComponent()

> **initialiseRightsManagementPolicyEnforcementProcessorComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyEnforcementProcessor`\>; `component?`: `IComponent`; \}\>

Initialise the rights management policy enforcement processor component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementPolicyEnforcementProcessorComponentConfig`](../type-aliases/RightsManagementPolicyEnforcementProcessorComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyEnforcementProcessor`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
