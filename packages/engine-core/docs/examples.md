# Engine Core Examples

These examples focus on common runtime patterns such as lifecycle control, cloning, state storage, and module loading.

## EngineCore

```typescript
import { EngineCore, MemoryStateStorage } from '@3sixty/engine-core';
import type { IEngineCoreConfig, IEngineState } from '@3sixty/engine-models';

interface AppState extends IEngineState {
  runCount?: number;
}

const config: IEngineCoreConfig = {
  debug: true,
  silent: false,
  types: {}
};

const stateStorage = new MemoryStateStorage<AppState>();
const engineCore = new EngineCore<IEngineCoreConfig, AppState>({
  config,
  stateStorage,
  skipBootstrap: true
});

engineCore.addTypeInitialiser('loggingConnector', '@3sixty/engine-types', 'initLoggingConnector');
console.log(engineCore.getTypeConfig('loggingConnector')?.length ?? 0); // 0

engineCore.addContextIdKey('tenant', ['tenant']);
engineCore.addContextId('tenant', 'tenant-a');

console.log(engineCore.getContextIdKeys()); // ["tenant"]
console.log(engineCore.getContextIds()); // { tenant: "tenant-a" }
console.log(engineCore.isPrimary()); // true
console.log(engineCore.isClone()); // false
console.log(engineCore.isStarted()); // false

await engineCore.start(true);
console.log(engineCore.isStarted()); // true

await engineCore.logInfo('Engine started for tenant-a');

const state = engineCore.getState();
state.runCount = (state.runCount ?? 0) + 1;
engineCore.setStateDirty();

console.log(engineCore.getConfig().debug); // true
console.log(engineCore.getRegisteredInstances()); // { loggingConnector: [...], loggingComponent: [...] }
console.log(engineCore.getRegisteredInstanceType('loggingComponent')); // "engine-logging-service"
console.log(engineCore.getRegisteredInstanceTypeOptional('hostingComponent')); // undefined

await engineCore.stop();
console.log(engineCore.isStarted()); // false
```

```typescript
import { BaseError, GeneralError } from '@3sixty/core';
import { EngineCore } from '@3sixty/engine-core';

const engineCore = new EngineCore({
  config: { debug: false, silent: true, types: {} },
  skipBootstrap: true
});

const wrapped = new GeneralError(
  EngineCore.CLASS_NAME,
  'sampleFailure',
  { area: 'examples' },
  BaseError.fromError(new Error('Sample failure'))
);
await engineCore.logError(wrapped);
```

```typescript
import { EngineCore } from '@3sixty/engine-core';

const primary = new EngineCore({
  config: { debug: false, silent: true, types: {} },
  skipBootstrap: true
});
primary.addContextIdKey('node', ['node']);

const cloneData = primary.getCloneData();

const clone = new EngineCore({ config: { debug: false, silent: true, types: {} } });
clone.populateClone(cloneData, { node: 'node-1', tenant: 'tenant-a' }, true);

console.log(clone.isClone()); // true
console.log(clone.getContextIds()); // { node: "node-1", tenant: "tenant-a" }
```

## FileStateStorage

```typescript
import { EngineCore, FileStateStorage } from '@3sixty/engine-core';

const engineCore = new EngineCore({
  config: { debug: false, silent: true, types: {} },
  skipBootstrap: true
});
const fileStorage = new FileStateStorage('./data/engine-state.json');

await fileStorage.save(engineCore, { ready: true });

const loaded = await fileStorage.load(engineCore);
console.log(loaded); // { ready: true }
```

## MemoryStateStorage

```typescript
import { EngineCore, MemoryStateStorage } from '@3sixty/engine-core';

const engineCore = new EngineCore({
  config: { debug: false, silent: true, types: {} },
  skipBootstrap: true
});
const memoryStorage = new MemoryStateStorage(false, { retries: 1 });

console.log(await memoryStorage.load(engineCore)); // { retries: 1 }

await memoryStorage.save(engineCore, { retries: 2 });
console.log(await memoryStorage.load(engineCore)); // { retries: 2 }
```

## EngineModuleHelper

```typescript
import { EngineCore, EngineModuleHelper } from '@3sixty/engine-core';
import type { IEngineModuleConfig } from '@3sixty/engine-models';

const engineCore = new EngineCore({
  config: { debug: false, silent: true, types: {} },
  skipBootstrap: true
});

const moduleConfig: IEngineModuleConfig = {
  moduleName: '@3sixty/logging-service',
  className: 'LoggingService',
  dependencies: [
    {
      propertyName: 'loggingConnectorType',
      componentName: 'loggingConnector',
      isOptional: false
    }
  ],
  config: {
    level: 'info'
  }
};

const component = await EngineModuleHelper.loadComponent<unknown>(engineCore, moduleConfig);
console.log(component !== undefined); // true
```
