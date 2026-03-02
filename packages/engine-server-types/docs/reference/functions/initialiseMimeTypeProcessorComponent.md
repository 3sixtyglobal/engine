# Function: initialiseMimeTypeProcessorComponent()

> **initialiseMimeTypeProcessorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MimeTypeProcessorConfig`](../type-aliases/MimeTypeProcessorConfig.md), `Factory`\<`IMimeTypeProcessor`\>\>

Initialise the mime type processor.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineServerConfig`](../interfaces/IEngineServerConfig.md)\>

The context for the engine.

### instanceConfig

[`MimeTypeProcessorConfig`](../type-aliases/MimeTypeProcessorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MimeTypeProcessorConfig`](../type-aliases/MimeTypeProcessorConfig.md), `Factory`\<`IMimeTypeProcessor`\>\>

The instance created and the factory for it.
