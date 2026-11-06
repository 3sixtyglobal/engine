# Type Alias: AuthenticationProviderConfig

> **AuthenticationProviderConfig** = \{ `type`: *typeof* [`ThreeSixty`](../variables/AuthenticationProviderType.md#threesixty); `options?`: `IEntityStorageAuthenticationProviderConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`ThreeSixtyOAuth`](../variables/AuthenticationProviderType.md#threesixtyoauth); `options`: `IEntityStorageOAuthProviderConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Google`](../variables/AuthenticationProviderType.md#google); `options`: `IGoogleOAuthProviderConnectorConstructorOptions`; \} \| \{ `type`: *typeof* [`Microsoft`](../variables/AuthenticationProviderType.md#microsoft); `options`: `IMicrosoftOAuthProviderConnectorConstructorOptions`; \}

Authentication provider config types.
