# Function: initialiseRightsManagementPolicyRequesterComponent()

> **initialiseRightsManagementPolicyRequesterComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RightsManagementPolicyRequesterComponentConfig`](../type-aliases/RightsManagementPolicyRequesterComponentConfig.md), `Factory`\<`IPolicyRequester`\>\>

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

`EngineTypeInitialiserReturn`\<[`RightsManagementPolicyRequesterComponentConfig`](../type-aliases/RightsManagementPolicyRequesterComponentConfig.md), `Factory`\<`IPolicyRequester`\>\>

The instance created and the factory for it.
