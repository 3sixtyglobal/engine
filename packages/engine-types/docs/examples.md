# Engine Types Examples

These examples show how to compose type-safe engine configuration and retrieve merged options for specific component instances.

## EngineTypeHelper

```typescript
import {
  EngineTypeHelper,
  EntityStorageComponentType,
  LoggingConnectorType,
  type IEngineConfig
} from '@3sixty/engine-types';

const engineConfig: IEngineConfig = {
  debug: false,
  silent: true,
  types: {
    loggingConnector: [{ type: LoggingConnectorType.Console, isDefault: true }],
    entityStorageComponent: [
      {
        type: EntityStorageComponentType.Service,
        options: {
          entityStorageType: 'product'
        },
        isDefault: true
      }
    ]
  }
};

const loggingConfig = EngineTypeHelper.getConfigOfType(
  engineConfig,
  'loggingConnector',
  LoggingConnectorType.Console
);
const mergedEntityOptions = EngineTypeHelper.mergeConfig(
  { entityStorageType: 'product', partitionContextIds: ['node'] },
  { partitionContextIds: ['node', 'tenant'] }
);

console.log(loggingConfig?.type); // "console"
console.log(mergedEntityOptions.partitionContextIds); // ["node", "tenant"]
```

## Building Config with Shared Type Constants

```typescript
import {
  EntityStorageComponentType,
  EntityStorageConnectorType,
  LoggingComponentType,
  LoggingConnectorType,
  TelemetryComponentType,
  TelemetryConnectorType,
  type IEngineConfig
} from '@3sixty/engine-types';

const config: IEngineConfig = {
  debug: true,
  silent: false,
  types: {
    loggingConnector: [{ type: LoggingConnectorType.Console }],
    loggingComponent: [{ type: LoggingComponentType.Service }],
    entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
    entityStorageComponent: [{ type: EntityStorageComponentType.Service }],
    telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
    telemetryComponent: [{ type: TelemetryComponentType.Service }]
  }
};

console.log(config.types.entityStorageConnector?.[0].type); // "memory"
console.log(config.types.telemetryComponent?.[0].type); // "service"
```
