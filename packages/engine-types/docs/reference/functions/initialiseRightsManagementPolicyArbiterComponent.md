# Function: initialiseRightsManagementPolicyArbiterComponent()

> **initialiseRightsManagementPolicyArbiterComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RightsManagementPolicyArbiterComponentConfig`](../type-aliases/RightsManagementPolicyArbiterComponentConfig.md), `Factory`\<`IPolicyArbiter`\>\>

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

`EngineTypeInitialiserReturn`\<[`RightsManagementPolicyArbiterComponentConfig`](../type-aliases/RightsManagementPolicyArbiterComponentConfig.md), `Factory`\<`IPolicyArbiter`\>\>

The instance created and the factory for it.
