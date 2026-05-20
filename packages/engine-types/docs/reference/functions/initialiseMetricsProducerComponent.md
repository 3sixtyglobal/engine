# Function: initialiseMetricsProducerComponent()

> **initialiseMetricsProducerComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`MetricsProducerComponentConfig`](../type-aliases/MetricsProducerComponentConfig.md), `Factory`\<`IMetricsProducer`\>\>

Initialise a metrics producer.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`MetricsProducerComponentConfig`](../type-aliases/MetricsProducerComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`MetricsProducerComponentConfig`](../type-aliases/MetricsProducerComponentConfig.md), `Factory`\<`IMetricsProducer`\>\>

The instance created and the factory for it.
