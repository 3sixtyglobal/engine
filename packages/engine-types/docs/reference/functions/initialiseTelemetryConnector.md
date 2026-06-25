# Function: initialiseTelemetryConnector()

> **initialiseTelemetryConnector**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md), `Factory`\<`ITelemetryConnector`\>\>

Initialise a telemetry connector.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md), `Factory`\<`ITelemetryConnector`\>\>

The instance created and the factory for it.
