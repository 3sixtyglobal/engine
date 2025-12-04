# Function: initialiseRightsManagementPolicyRequesterComponent()

> **initialiseRightsManagementPolicyRequesterComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyRequester`\>; `component?`: `IComponent`; \}\>

Initialise the rights management policy requester component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementPolicyRequesterComponentConfig`](../type-aliases/RightsManagementPolicyRequesterComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyRequester`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
