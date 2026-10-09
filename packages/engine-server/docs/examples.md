# Engine Server Examples

These examples show how to wire a core instance into an HTTP server and apply default REST and socket paths.

## EngineServer

```typescript
import { Engine } from '@3sixty/engine';
import { EngineServer } from '@3sixty/engine-server';
import type { IEngineServerConfig } from '@3sixty/engine-server-types';
import {
  HostingComponentType,
  InformationComponentType,
  RestRouteProcessorType,
  SocketRouteProcessorType
} from '@3sixty/engine-server-types';

const config: IEngineServerConfig = {
  debug: false,
  silent: true,
  web: { port: 3001 },
  types: {
    hostingComponent: [{ type: HostingComponentType.Service }],
    informationComponent: [{ type: InformationComponentType.Service, restPath: '/info' }],
    restRouteProcessor: [{ type: RestRouteProcessorType.RestRoute }],
    socketRouteProcessor: [{ type: SocketRouteProcessorType.SocketRoute }]
  }
};

const engine = new Engine({ config, skipBootstrap: true });
const server = new EngineServer({ engineCore: engine });

server.addRestRouteGenerator(
  'informationComponent',
  '@3sixty/engine-server-types',
  'generateInformationRestRoutes'
);
server.addSocketRouteGenerator(
  'informationComponent',
  '@3sixty/engine-server-types',
  'generateInformationSocketRoutes'
);

console.log(server.getRestRoutes().length); // 0
console.log(server.getSocketRoutes().length); // 0

await server.start();
console.log(server.getRestRoutes().length > 0); // true

await server.stop();
```

## addDefaultRestPaths and addDefaultSocketPaths

```typescript
import { addDefaultRestPaths, addDefaultSocketPaths } from '@3sixty/engine-server';
import type { IEngineServerConfig } from '@3sixty/engine-server-types';
import {
  InformationComponentType,
  RestRouteProcessorType,
  SocketRouteProcessorType
} from '@3sixty/engine-server-types';

const serverConfig: IEngineServerConfig = {
  debug: false,
  silent: false,
  types: {
    informationComponent: [{ type: InformationComponentType.Service }],
    restRouteProcessor: [{ type: RestRouteProcessorType.RestRoute }],
    socketRouteProcessor: [{ type: SocketRouteProcessorType.SocketRoute }]
  }
};

addDefaultRestPaths(serverConfig);
addDefaultSocketPaths(serverConfig);

console.log(typeof serverConfig.types.informationComponent?.[0].restPath === 'string'); // true
console.log(typeof serverConfig.types.informationComponent?.[0].socketPath === 'string'); // true
```
