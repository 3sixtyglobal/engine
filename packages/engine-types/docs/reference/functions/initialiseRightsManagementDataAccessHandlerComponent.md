# Function: initialiseRightsManagementDataAccessHandlerComponent()

> **initialiseRightsManagementDataAccessHandlerComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IDataAccessHandler`\>; `component?`: `IComponent`; \}\>

Initialise the rights management data access handler component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RightsManagementDataAccessHandlerComponentConfig`](../type-aliases/RightsManagementDataAccessHandlerComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`IDataAccessHandler`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
