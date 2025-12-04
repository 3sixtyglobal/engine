# Function: initialiseRightsManagementPolicyNegotiatorComponent()

> **initialiseRightsManagementPolicyNegotiatorComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyNegotiator`\>; `component?`: `IComponent`; \}\>

Initialise the rights management policy negotiator component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementPolicyNegotiatorComponentConfig`](../type-aliases/RightsManagementPolicyNegotiatorComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IPolicyNegotiator`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
