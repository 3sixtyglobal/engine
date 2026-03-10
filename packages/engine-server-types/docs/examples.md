# Engine Server Types Examples

These examples demonstrate how to compose server configuration with shared type constants for REST and socket processing.

## Component and Processor Types

```typescript
import {
  AuthenticationComponentType,
  HostingComponentType,
  InformationComponentType,
  RestRouteProcessorType,
  SocketRouteProcessorType
} from '@twin.org/engine-server-types';

const selectedTypes = {
  authentication: AuthenticationComponentType.Service,
  hosting: HostingComponentType.Service,
  information: InformationComponentType.Service,
  restProcessor: RestRouteProcessorType.RestRoute,
  socketProcessor: SocketRouteProcessorType.SocketRoute
};

console.log(selectedTypes.authentication); // "service"
console.log(selectedTypes.restProcessor); // "rest-route"
```

## IEngineServerConfig

```typescript
import type { IEngineServerConfig } from '@twin.org/engine-server-types';
import {
  AuthenticationComponentType,
  HostingComponentType,
  InformationComponentType,
  RestRouteProcessorType,
  SocketRouteProcessorType
} from '@twin.org/engine-server-types';

const serverConfig: IEngineServerConfig = {
  debug: true,
  silent: false,
  web: {
    port: 3001,
    host: '0.0.0.0'
  },
  types: {
    hostingComponent: [{ type: HostingComponentType.Service }],
    informationComponent: [{ type: InformationComponentType.Service, restPath: '/info' }],
    authenticationComponent: [{ type: AuthenticationComponentType.Service }],
    restRouteProcessor: [
      { type: RestRouteProcessorType.Logging },
      { type: RestRouteProcessorType.RestRoute }
    ],
    socketRouteProcessor: [
      { type: SocketRouteProcessorType.Logging },
      { type: SocketRouteProcessorType.SocketRoute }
    ]
  }
};

console.log(serverConfig.web?.port); // 3001
console.log(serverConfig.types.restRouteProcessor?.length ?? 0); // 2
```
