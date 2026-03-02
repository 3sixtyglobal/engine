# Function: initialiseInformationComponent()

> **initialiseInformationComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`InformationComponentConfig`](../type-aliases/InformationComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the information component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`InformationComponentConfig`](../type-aliases/InformationComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`InformationComponentConfig`](../type-aliases/InformationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
