# Function: initialiseTelemetryComponent()

> **initialiseTelemetryComponent**(`engineCore`, `context`, `instanceConfig`): `EngineTypeInitialiserReturn`\<[`TelemetryComponentConfig`](../type-aliases/TelemetryComponentConfig.md), `Factory`\<`IComponent`\>\>

Initialise the telemetry component.

## Parameters

### engineCore

`IEngineCore`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The engine core.

### context

`IEngineCoreContext`\<[`IEngineConfig`](../interfaces/IEngineConfig.md)\>

The context for the engine.

### instanceConfig

[`TelemetryComponentConfig`](../type-aliases/TelemetryComponentConfig.md)

The instance config.

## Returns

`EngineTypeInitialiserReturn`\<[`TelemetryComponentConfig`](../type-aliases/TelemetryComponentConfig.md), `Factory`\<`IComponent`\>\>

The instance created and the factory for it.
