# Function: initialiseTrustVerifierComponent()

> **initialiseTrustVerifierComponent**(`engineCore`, `context`, `instanceConfig`): `Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`ITrustVerifier`\>; `component?`: `IComponent`; \}\>

Initialise the trust verifier component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TrustVerifierComponentConfig`](../type-aliases/TrustVerifierComponentConfig.md)

The instance config.

## Returns

`Promise`\<\{ `instanceType?`: `string`; `factory?`: `Factory`\<`ITrustVerifier`\>; `component?`: `IComponent`; \}\>

The instance created and the factory for it.
