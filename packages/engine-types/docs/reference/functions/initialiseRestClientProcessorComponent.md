# Function: initialiseRestClientProcessorComponent()

> **initialiseRestClientProcessorComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`RestClientProcessorConfig`](../type-aliases/RestClientProcessorConfig.md), `Factory`\<`IRestClientProcessor`\>\>

Initialise the REST client processor.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`RestClientProcessorConfig`](../type-aliases/RestClientProcessorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`RestClientProcessorConfig`](../type-aliases/RestClientProcessorConfig.md), `Factory`\<`IRestClientProcessor`\>\>

The instance created and the factory for it.
