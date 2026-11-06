# Function: initialiseTrustGeneratorComponent()

> **initialiseTrustGeneratorComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`TrustGeneratorComponentConfig`](../type-aliases/TrustGeneratorComponentConfig.md), `Factory`\<`ITrustGenerator`\>\>

Initialise the trust generator component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TrustGeneratorComponentConfig`](../type-aliases/TrustGeneratorComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`TrustGeneratorComponentConfig`](../type-aliases/TrustGeneratorComponentConfig.md), `Factory`\<`ITrustGenerator`\>\>

The instance created and the factory for it.
