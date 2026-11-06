# Function: initialiseMetricsProducerComponent()

> **initialiseMetricsProducerComponent**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`MetricsProducerComponentConfig`](../type-aliases/MetricsProducerComponentConfig.md), `Factory`\<`IMetricsProducer`\>\>

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

`IEngineTypeInitialiserReturn`\<[`MetricsProducerComponentConfig`](../type-aliases/MetricsProducerComponentConfig.md), `Factory`\<`IMetricsProducer`\>\>

The instance created and the factory for it.
