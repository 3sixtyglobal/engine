# Function: initialiseRightsManagementPolicyInformationSourceComponent()

> **initialiseRightsManagementPolicyInformationSourceComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RightsManagementPolicyInformationSourceComponentConfig`](../type-aliases/RightsManagementPolicyInformationSourceComponentConfig.md), `Factory`\<`IPolicyInformationSource`\>\>

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

`EngineTypeInitialiserReturn`\<[`RightsManagementPolicyInformationSourceComponentConfig`](../type-aliases/RightsManagementPolicyInformationSourceComponentConfig.md), `Factory`\<`IPolicyInformationSource`\>\>

The instance created and the factory for it.
