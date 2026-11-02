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
} from '@3sixty/engine-server-types';

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
import type { IEngineServerConfig } from '@3sixty/engine-server-types';
import {
  AuthenticationComponentType,
  HostingComponentType,
  InformationComponentType,
  RestRouteProcessorType,
  SocketRouteProcessorType
} from '@3sixty/engine-server-types';

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

## Authentication Providers and OAuth

Each provider is registered with the authentication provider factory under its id, so `entity-storage` handles password logins and `google` or `microsoft` handle OAuth sign in through the OAuth component.

```typescript
import type { IEngineServerConfig } from '@3sixty/engine-server-types';
import {
  AuthenticationComponentType,
  AuthenticationProviderType,
  OAuthComponentType
} from '@3sixty/engine-server-types';

const types: Partial<IEngineServerConfig['types']> = {
  authenticationComponent: [{ type: AuthenticationComponentType.EntityStorage }],
  authenticationProvider: [
    { type: AuthenticationProviderType.EntityStorage },
    {
      type: AuthenticationProviderType.Google,
      options: {
        config: {
          clientId: 'google-client-id',
          clientSecret: 'google-client-secret',
          allowedDomains: ['example.org']
        }
      }
    },
    {
      type: AuthenticationProviderType.Microsoft,
      options: {
        config: {
          clientId: 'microsoft-client-id',
          clientSecret: 'microsoft-client-secret',
          tenant: 'organizations',
          allowedTenants: ['9188040d-6c67-4c5b-b112-36a304b66dad']
        }
      }
    }
  ],
  oauthComponent: [
    {
      type: OAuthComponentType.Service,
      options: {
        config: {
          successRedirectUrl: 'https://app.example.org/',
          failureRedirectUrl: 'https://app.example.org/login'
        }
      }
    }
  ]
};

console.log(types.authenticationProvider?.length); // 3
```

The OAuth component signs the sign in kept by the browser with the node signing key in the registered vault connector. Accounts created through a provider are given the default roles with the registered authorization component.

## Organizations and Password Reset

The organization component registers organizations on the node, inside the tenant partition, and the authentication component sends password reset links through the registered messaging component.

```typescript
import type { IEngineServerConfig } from '@3sixty/engine-server-types';
import {
  AuthenticationComponentType,
  OrganizationComponentType
} from '@3sixty/engine-server-types';

const types: Partial<IEngineServerConfig['types']> = {
  authenticationComponent: [
    {
      type: AuthenticationComponentType.EntityStorage,
      options: {
        config: {
          passwordResetUrl: 'https://app.example.org/reset-password',
          registrationVerificationUrl: 'https://app.example.org/verify',
          emailSender: 'no-reply@example.org'
        }
      }
    }
  ],
  organizationComponent: [
    {
      type: OrganizationComponentType.EntityStorage,
      options: { config: { verificationMethodId: 'trust-assertion' } }
    }
  ]
};

console.log(types.organizationComponent?.length); // 1
```
