# Function: initialiseTrustGeneratorComponent()

> **initialiseTrustGeneratorComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`ITrustGenerator`\>; `component?`: `IComponent`; \}\>

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

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`ITrustGenerator`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
