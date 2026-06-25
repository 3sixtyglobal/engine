# Function: initialiseRightsManagementPolicyObligationEnforcerComponent()

> **initialiseRightsManagementPolicyObligationEnforcerComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RightsManagementPolicyObligationEnforcerComponentConfig`](../type-aliases/RightsManagementPolicyObligationEnforcerComponentConfig.md), `Factory`\<`IPolicyObligationEnforcer`\>\>

Initialise the rights management policy obligation enforcer component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementPolicyObligationEnforcerComponentConfig`](../type-aliases/RightsManagementPolicyObligationEnforcerComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`RightsManagementPolicyObligationEnforcerComponentConfig`](../type-aliases/RightsManagementPolicyObligationEnforcerComponentConfig.md), `Factory`\<`IPolicyObligationEnforcer`\>\>

The instance created and the factory for it.
