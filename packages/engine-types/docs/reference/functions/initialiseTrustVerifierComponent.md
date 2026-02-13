# Function: initialiseTrustVerifierComponent()

> **initialiseTrustVerifierComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`TrustVerifierComponentConfig`](../type-aliases/TrustVerifierComponentConfig.md), `Factory`\<`ITrustVerifier`\>\>

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

`EngineTypeInitialiserReturn`\<[`TrustVerifierComponentConfig`](../type-aliases/TrustVerifierComponentConfig.md), `Factory`\<`ITrustVerifier`\>\>

The instance created and the factory for it.
