# Function: initialiseTrustComponent()

> **initialiseTrustComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`TrustComponentConfig`](../type-aliases/TrustComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the trust component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TrustComponentConfig`](../type-aliases/TrustComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`TrustComponentConfig`](../type-aliases/TrustComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
