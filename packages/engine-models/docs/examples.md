# Engine Models Examples

These examples show how to register factories and define strongly typed contracts for core and server integrations.

## EngineCoreFactory and EngineServerFactory

```typescript
import { EngineCoreFactory, EngineServerFactory } from '@twin.org/engine-models';
import { EngineCore } from '@twin.org/engine-core';
import { EngineServer } from '@twin.org/engine-server';

EngineCoreFactory.register(
  'default',
  () => new EngineCore({ config: { debug: false, silent: true, types: {} }, skipBootstrap: true })
);
EngineServerFactory.register(
  'default',
  () => new EngineServer({ engineCore: EngineCoreFactory.get('default') })
);

const core = EngineCoreFactory.get('default');
const server = EngineServerFactory.get('default');

console.log(core.isStarted()); // false
console.log(server.getRestRoutes().length); // 0
```

## IEngineCoreConfig and IEngineCoreTypeConfig

```typescript
import type { IEngineCoreConfig, IEngineCoreTypeConfig } from '@twin.org/engine-models';

const loggingConnectorConfig: IEngineCoreTypeConfig<{ config: { prettyPrint: boolean } }> = {
  type: 'console',
  isDefault: true,
  options: {
    config: {
      prettyPrint: true
    }
  }
};

const coreConfig: IEngineCoreConfig = {
  debug: true,
  silent: false,
  types: {
    loggingConnector: [loggingConnectorConfig]
  }
};

console.log(coreConfig.types.loggingConnector?.[0].type); // "console"
```

## EngineCloneHelper

```typescript
import { EngineCloneHelper } from '@twin.org/engine-models';
import type { IEngineCoreClone } from '@twin.org/engine-models';

const excludeTypes = EngineCloneHelper.verifyExcludeCloneComponents(['^rightsManagement']);

const cloneData: IEngineCoreClone = {
  config: {
    types: {
      loggingConnector: [{ type: 'console' }],
      rightsManagementPapComponent: [{ type: 'service' }]
    }
  },
  state: {},
  typeInitialisers: [],
  entitySchemas: {},
  contextIdKeys: []
};

const filtered = EngineCloneHelper.filterCloneComponents(cloneData, excludeTypes);

console.log(Object.keys(filtered.config.types)); // ["loggingConnector"]
```
