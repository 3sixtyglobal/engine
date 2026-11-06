# Function: initialiseDataExtractorConnector()

> **initialiseDataExtractorConnector**(`engineCore`, `context`, `instanceConfig`): `IEngineTypeInitialiserReturn`\<[`DataExtractorConnectorConfig`](../type-aliases/DataExtractorConnectorConfig.md), `Factory`\<`IDataExtractorConnector`\>\>

Initialise the data extractor connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`DataExtractorConnectorConfig`](../type-aliases/DataExtractorConnectorConfig.md)

The instance config.

## Returns

`IEngineTypeInitialiserReturn`\<[`DataExtractorConnectorConfig`](../type-aliases/DataExtractorConnectorConfig.md), `Factory`\<`IDataExtractorConnector`\>\>

The instance created and the factory for it.
