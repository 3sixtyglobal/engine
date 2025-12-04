# Function: initialiseRightsManagementPolicyInformationSourceComponent()

> **initialiseRightsManagementPolicyInformationSourceComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyInformationSource`\>; `component?`: `IComponent`; \}\>

Initialise the rights management policy information source component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementPolicyInformationSourceComponentConfig`](../type-aliases/RightsManagementPolicyInformationSourceComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyInformationSource`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
