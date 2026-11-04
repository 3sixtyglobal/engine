# Function: initialiseFeatureComponent()

> **initialiseFeatureComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`FeatureComponentConfig`](../type-aliases/FeatureComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the feature component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`FeatureComponentConfig`](../type-aliases/FeatureComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`FeatureComponentConfig`](../type-aliases/FeatureComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
