# Function: initialiseRightsManagementPolicyNegotiatorComponent()

> **initialiseRightsManagementPolicyNegotiatorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RightsManagementPolicyNegotiatorComponentConfig`](../type-aliases/RightsManagementPolicyNegotiatorComponentConfig.md), `Factory`\<`IPolicyNegotiator`\>\>

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

`EngineTypeInitialiserReturn`\<[`RightsManagementPolicyNegotiatorComponentConfig`](../type-aliases/RightsManagementPolicyNegotiatorComponentConfig.md), `Factory`\<`IPolicyNegotiator`\>\>

The instance created and the factory for it.
