# Function: initialiseAttestationComponent()

> **initialiseAttestationComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`AttestationComponentConfig`](../type-aliases/AttestationComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the attestation component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`AttestationComponentConfig`](../type-aliases/AttestationComponentConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`AttestationComponentConfig`](../type-aliases/AttestationComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
