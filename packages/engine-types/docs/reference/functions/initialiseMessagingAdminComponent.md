# Function: initialiseMessagingAdminComponent()

> **initialiseMessagingAdminComponent**(`engineCore`, `context`, `instanceConfig`, `overrideInstanceType?`): `Promise`\<`undefined` \| `string`\>

Initialise the messaging admin component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MessagingAdminComponentConfig`](../type-aliases/MessagingAdminComponentConfig.md)

The instance config.

### overrideInstanceType?

`string`

The instance type to override the default.

## Returns

`Promise`\<`undefined` \| `string`\>

The name of the instance created.

## Throws

GeneralError if the component type is unknown.
