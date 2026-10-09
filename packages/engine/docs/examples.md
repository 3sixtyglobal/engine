# Engine Examples

These examples show a practical way to configure and run an instance with built-in type initialisers and custom entity storage.

## Engine

```typescript
import { Engine } from '@3sixty/engine';
import type { IEngineConfig } from '@3sixty/engine-types';

const config: IEngineConfig = {
  debug: true,
  silent: false,
  types: {}
};

const engine = new Engine({ config, skipBootstrap: true });

engine.addContextIdKey('tenant', ['tenant']);
engine.addContextId('tenant', 'tenant-a');

engine.addTypeInitialiser('loggingConnector', '@3sixty/engine-types', 'initLoggingConnector');

console.log(engine.getContextIdKeys()); // ["tenant"]
console.log(engine.getContextIds()); // { tenant: "tenant-a" }
console.log(engine.isStarted()); // false

await engine.start(true);
console.log(engine.isStarted()); // true

await engine.stop();
console.log(engine.isStarted()); // false
```

## EngineConfigHelper

```typescript
import { EngineConfigHelper } from '@3sixty/engine';
import type { IEngineConfig } from '@3sixty/engine-types';
import type { IEntitySchema } from '@3sixty/entity';

interface Product {
  id: string;
  name: string;
}

const config: IEngineConfig = {
  debug: false,
  silent: true,
  types: {}
};

const productSchema = {
  type: 'Product',
  properties: {
    id: { type: 'string', isPrimary: true },
    name: { type: 'string' }
  }
} as IEntitySchema<Product>;

EngineConfigHelper.addCustomEntityStorage(config, 'product', productSchema, '/products', [
  'node',
  'tenant'
]);

console.log(config.types.entityStorageComponent?.length ?? 0); // 1
console.log(config.types.entityStorageComponent?.[0].restPath); // "/products"
```
