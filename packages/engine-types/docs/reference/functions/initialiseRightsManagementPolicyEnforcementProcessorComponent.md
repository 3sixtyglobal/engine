# Function: initialiseRightsManagementPolicyEnforcementProcessorComponent()

> **initialiseRightsManagementPolicyEnforcementProcessorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RightsManagementPolicyEnforcementProcessorComponentConfig`](../type-aliases/RightsManagementPolicyEnforcementProcessorComponentConfig.md), `Factory`\<`IPolicyEnforcementProcessor`\>\>

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

`EngineTypeInitialiserReturn`\<[`RightsManagementPolicyEnforcementProcessorComponentConfig`](../type-aliases/RightsManagementPolicyEnforcementProcessorComponentConfig.md), `Factory`\<`IPolicyEnforcementProcessor`\>\>

The instance created and the factory for it.
