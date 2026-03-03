# Interface: IEngineConfig

Extended engine core config with known types.

## Extends

- `IEngineCoreConfig`

## Properties

### debug?

> `optional` **debug**: `boolean`

Start the engine in debug mode.

#### Default

```ts
false
```

#### Inherited from

`IEngineCoreConfig.debug`

***

### silent?

> `optional` **silent**: `boolean`

Disable output to the console.

#### Default

```ts
false
```

#### Inherited from

`IEngineCoreConfig.silent`

***

### types

> **types**: `object`

The types to initialise in the engine.

#### Index Signature

\[`type`: `string`\]: `IEngineCoreTypeConfig`[] \| `undefined`

#### loggingConnector?

> `optional` **loggingConnector**: `IEngineCoreTypeConfig`\<[`LoggingConnectorConfig`](../type-aliases/LoggingConnectorConfig.md)\>[]

Logging connector options which can be overridden by individual components by specifying types other than default.

#### loggingComponent?

> `optional` **loggingComponent**: `IEngineCoreTypeConfig`\<[`LoggingComponentConfig`](../type-aliases/LoggingComponentConfig.md)\>[]

Logging component options which can be overridden by individual components by specifying types other than default.

#### entityStorageConnector?

> `optional` **entityStorageConnector**: `IEngineCoreTypeConfig`\<[`EntityStorageConnectorConfig`](../type-aliases/EntityStorageConnectorConfig.md)\>[]

Entity storage connector options which can be overridden by individual components by specifying types other than default.

#### entityStorageComponent?

> `optional` **entityStorageComponent**: `IEngineCoreTypeConfig`\<[`EntityStorageComponentConfig`](../type-aliases/EntityStorageComponentConfig.md)\>[]

Entity storage component options which can be overridden by individual components by specifying types other than default.

#### blobStorageConnector?

> `optional` **blobStorageConnector**: `IEngineCoreTypeConfig`\<[`BlobStorageConnectorConfig`](../type-aliases/BlobStorageConnectorConfig.md)\>[]

Blob storage connector options which can be overridden by individual components by specifying types other than default.

#### blobStorageComponent?

> `optional` **blobStorageComponent**: `IEngineCoreTypeConfig`\<[`BlobStorageComponentConfig`](../type-aliases/BlobStorageComponentConfig.md)\>[]

Blob storage component options which can be overridden by individual components by specifying types other than default.

#### telemetryConnector?

> `optional` **telemetryConnector**: `IEngineCoreTypeConfig`\<[`TelemetryConnectorConfig`](../type-aliases/TelemetryConnectorConfig.md)\>[]

Telemetry connector options which can be overridden by individual components by specifying types other than default.

#### telemetryComponent?

> `optional` **telemetryComponent**: `IEngineCoreTypeConfig`\<[`TelemetryComponentConfig`](../type-aliases/TelemetryComponentConfig.md)\>[]

Telemetry component options which can be overridden by individual components by specifying types other than default.

#### messagingEmailConnector?

> `optional` **messagingEmailConnector**: `IEngineCoreTypeConfig`\<[`MessagingEmailConnectorConfig`](../type-aliases/MessagingEmailConnectorConfig.md)\>[]

Messaging email connector options which can be overridden by individual components by specifying types other than default.

#### messagingSmsConnector?

> `optional` **messagingSmsConnector**: `IEngineCoreTypeConfig`\<[`MessagingSmsConnectorConfig`](../type-aliases/MessagingSmsConnectorConfig.md)\>[]

Messaging SMS connector options which can be overridden by individual components by specifying types other than default.

#### messagingPushNotificationConnector?

> `optional` **messagingPushNotificationConnector**: `IEngineCoreTypeConfig`\<[`MessagingPushNotificationConnectorConfig`](../type-aliases/MessagingPushNotificationConnectorConfig.md)\>[]

Messaging push notification connector options which can be overridden by individual components by specifying types other than default.

#### messagingAdminComponent?

> `optional` **messagingAdminComponent**: `IEngineCoreTypeConfig`\<[`MessagingAdminComponentConfig`](../type-aliases/MessagingAdminComponentConfig.md)\>[]

Messaging admin component options which can be overridden by individual components by specifying types other than default.

#### messagingComponent?

> `optional` **messagingComponent**: `IEngineCoreTypeConfig`\<[`MessagingComponentConfig`](../type-aliases/MessagingComponentConfig.md)\>[]

Messaging component options which can be overridden by individual components by specifying types other than default.

#### backgroundTaskComponent?

> `optional` **backgroundTaskComponent**: `IEngineCoreTypeConfig`\<[`BackgroundTaskComponentConfig`](../type-aliases/BackgroundTaskComponentConfig.md)\>[]

Background task component options which can be overridden by individual components by specifying types other than default.

#### taskSchedulerComponent?

> `optional` **taskSchedulerComponent**: `IEngineCoreTypeConfig`\<[`TaskSchedulerComponentConfig`](../type-aliases/TaskSchedulerComponentConfig.md)\>[]

Task scheduler component options which can be overridden by individual components by specifying types other than default.

#### eventBusConnector?

> `optional` **eventBusConnector**: `IEngineCoreTypeConfig`\<[`EventBusConnectorConfig`](../type-aliases/EventBusConnectorConfig.md)\>[]

Event bus connector options which can be overridden by individual components by specifying types other than default.

#### eventBusComponent?

> `optional` **eventBusComponent**: `IEngineCoreTypeConfig`\<[`EventBusComponentConfig`](../type-aliases/EventBusComponentConfig.md)\>[]

Event bus component options which can be overridden by individual components by specifying types other than default.

#### vaultConnector?

> `optional` **vaultConnector**: `IEngineCoreTypeConfig`\<[`VaultConnectorConfig`](../type-aliases/VaultConnectorConfig.md)\>[]

Vault connector options which can be overridden by individual components by specifying types other than default.

#### dltConfig?

> `optional` **dltConfig**: `IEngineCoreTypeConfig`\<[`DltConfig`](../type-aliases/DltConfig.md)\>[]

DLT options which can be overridden by individual components by specifying types other than default.

#### walletConnector?

> `optional` **walletConnector**: `IEngineCoreTypeConfig`\<[`WalletConnectorConfig`](../type-aliases/WalletConnectorConfig.md)\>[]

Wallet connector options which can be overridden by individual components by specifying types other than default.

#### verifiableStorageConnector?

> `optional` **verifiableStorageConnector**: `IEngineCoreTypeConfig`\<[`VerifiableStorageConnectorConfig`](../type-aliases/VerifiableStorageConnectorConfig.md)\>[]

Verifiable storage connector options which can be overridden by individual components by specifying types other than default.

#### verifiableStorageComponent?

> `optional` **verifiableStorageComponent**: `IEngineCoreTypeConfig`\<[`VerifiableStorageComponentConfig`](../type-aliases/VerifiableStorageComponentConfig.md)\>[]

Verifiable storage component options which can be overridden by individual components by specifying types other than default.

#### immutableProofComponent?

> `optional` **immutableProofComponent**: `IEngineCoreTypeConfig`\<[`ImmutableProofComponentConfig`](../type-aliases/ImmutableProofComponentConfig.md)\>[]

Immutable proof component options which can be overridden by individual components by specifying types other than default.

#### faucetConnector?

> `optional` **faucetConnector**: `IEngineCoreTypeConfig`\<[`FaucetConnectorConfig`](../type-aliases/FaucetConnectorConfig.md)\>[]

Faucet connector options which can be overridden by individual components by specifying types other than default.

#### identityConnector?

> `optional` **identityConnector**: `IEngineCoreTypeConfig`\<[`IdentityConnectorConfig`](../type-aliases/IdentityConnectorConfig.md)\>[]

Identity connector options which can be overridden by individual components by specifying types other than default.

#### identityComponent?

> `optional` **identityComponent**: `IEngineCoreTypeConfig`\<[`IdentityComponentConfig`](../type-aliases/IdentityComponentConfig.md)\>[]

Identity component options which can be overridden by individual components by specifying types other than default.

#### identityResolverConnector?

> `optional` **identityResolverConnector**: `IEngineCoreTypeConfig`\<[`IdentityResolverConnectorConfig`](../type-aliases/IdentityResolverConnectorConfig.md)\>[]

Identity resolver connector options which can be overridden by individual components by specifying types other than default.

#### identityResolverComponent?

> `optional` **identityResolverComponent**: `IEngineCoreTypeConfig`\<[`IdentityResolverComponentConfig`](../type-aliases/IdentityResolverComponentConfig.md)\>[]

Identity resolver component options which can be overridden by individual components by specifying types other than default.

#### identityProfileConnector?

> `optional` **identityProfileConnector**: `IEngineCoreTypeConfig`\<[`IdentityProfileConnectorConfig`](../type-aliases/IdentityProfileConnectorConfig.md)\>[]

Identity profile connector options which can be overridden by individual components by specifying types other than default.

#### identityProfileComponent?

> `optional` **identityProfileComponent**: `IEngineCoreTypeConfig`\<[`IdentityProfileComponentConfig`](../type-aliases/IdentityProfileComponentConfig.md)\>[]

Identity profile component options which can be overridden by individual components by specifying types other than default.

#### nftConnector?

> `optional` **nftConnector**: `IEngineCoreTypeConfig`\<[`NftConnectorConfig`](../type-aliases/NftConnectorConfig.md)\>[]

NFT connector options which can be overridden by individual components by specifying types other than default.

#### nftComponent?

> `optional` **nftComponent**: `IEngineCoreTypeConfig`\<[`NftComponentConfig`](../type-aliases/NftComponentConfig.md)\>[]

NFT component options which can be overridden by individual components by specifying types other than default.

#### attestationConnector?

> `optional` **attestationConnector**: `IEngineCoreTypeConfig`\<[`AttestationConnectorConfig`](../type-aliases/AttestationConnectorConfig.md)\>[]

Attestation connector options which can be overridden by individual components by specifying types other than default.

#### attestationComponent?

> `optional` **attestationComponent**: `IEngineCoreTypeConfig`\<[`AttestationComponentConfig`](../type-aliases/AttestationComponentConfig.md)\>[]

Attestation component options which can be overridden by individual components by specifying types other than default.

#### auditableItemGraphComponent?

> `optional` **auditableItemGraphComponent**: `IEngineCoreTypeConfig`\<[`AuditableItemGraphComponentConfig`](../type-aliases/AuditableItemGraphComponentConfig.md)\>[]

Auditable item graph component options which can be overridden by individual components by specifying types other than default.

#### auditableItemStreamComponent?

> `optional` **auditableItemStreamComponent**: `IEngineCoreTypeConfig`\<[`AuditableItemStreamComponentConfig`](../type-aliases/AuditableItemStreamComponentConfig.md)\>[]

Auditable item stream component  options which can be overridden by individual components by specifying types other than default.

#### dataConverterConnector?

> `optional` **dataConverterConnector**: `IEngineCoreTypeConfig`\<[`DataConverterConnectorConfig`](../type-aliases/DataConverterConnectorConfig.md)\>[]

Data converter connector options which can be overridden by individual components by specifying types other than default.

#### dataExtractorConnector?

> `optional` **dataExtractorConnector**: `IEngineCoreTypeConfig`\<[`DataExtractorConnectorConfig`](../type-aliases/DataExtractorConnectorConfig.md)\>[]

Data extractor connector options which can be overridden by individual components by specifying types other than default.

#### dataProcessingComponent?

> `optional` **dataProcessingComponent**: `IEngineCoreTypeConfig`\<[`DataProcessingComponentConfig`](../type-aliases/DataProcessingComponentConfig.md)\>[]

Date processing options which can be overridden by individual components by specifying types other than default.

#### documentManagementComponent?

> `optional` **documentManagementComponent**: `IEngineCoreTypeConfig`\<[`DocumentManagementComponentConfig`](../type-aliases/DocumentManagementComponentConfig.md)\>[]

Document management options which can be overridden by individual components by specifying types other than default.

#### trustComponent?

> `optional` **trustComponent**: `IEngineCoreTypeConfig`\<[`TrustComponentConfig`](../type-aliases/TrustComponentConfig.md)\>[]

Trust component options which can be overridden by individual components by specifying types other than default.

#### trustGeneratorComponent?

> `optional` **trustGeneratorComponent**: `IEngineCoreTypeConfig`\<[`TrustGeneratorComponentConfig`](../type-aliases/TrustGeneratorComponentConfig.md)\>[]

Trust generator component options which can be overridden by individual components by specifying types other than default.

#### trustVerifierComponent?

> `optional` **trustVerifierComponent**: `IEngineCoreTypeConfig`\<[`TrustVerifierComponentConfig`](../type-aliases/TrustVerifierComponentConfig.md)\>[]

Trust verifier component options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPapComponent?

> `optional` **rightsManagementPapComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPapComponentConfig`](../type-aliases/RightsManagementPapComponentConfig.md)\>[]

Rights management PAP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPdpComponent?

> `optional` **rightsManagementPdpComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPdpComponentConfig`](../type-aliases/RightsManagementPdpComponentConfig.md)\>[]

Rights management PDP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPepComponent?

> `optional` **rightsManagementPepComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPepComponentConfig`](../type-aliases/RightsManagementPepComponentConfig.md)\>[]

Rights management PEP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPipComponent?

> `optional` **rightsManagementPipComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPipComponentConfig`](../type-aliases/RightsManagementPipComponentConfig.md)\>[]

Rights management PIP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPmpComponent?

> `optional` **rightsManagementPmpComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPmpComponentConfig`](../type-aliases/RightsManagementPmpComponentConfig.md)\>[]

Rights management PMP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPxpComponent?

> `optional` **rightsManagementPxpComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPxpComponentConfig`](../type-aliases/RightsManagementPxpComponentConfig.md)\>[]

Rights management PXP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPnpComponent?

> `optional` **rightsManagementPnpComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPnpComponentConfig`](../type-aliases/RightsManagementPnpComponentConfig.md)\>[]

Rights management PNP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPnapComponent?

> `optional` **rightsManagementPnapComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPnapComponentConfig`](../type-aliases/RightsManagementPnapComponentConfig.md)\>[]

Rights management PNAP options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPolicyArbiterComponent?

> `optional` **rightsManagementPolicyArbiterComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPolicyArbiterComponentConfig`](../type-aliases/RightsManagementPolicyArbiterComponentConfig.md)\>[]

Rights management policy arbiter options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPolicyObligationEnforcerComponent?

> `optional` **rightsManagementPolicyObligationEnforcerComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPolicyObligationEnforcerComponentConfig`](../type-aliases/RightsManagementPolicyObligationEnforcerComponentConfig.md)\>[]

Rights management policy obligation enforcer options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPolicyEnforcementProcessorComponent?

> `optional` **rightsManagementPolicyEnforcementProcessorComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPolicyEnforcementProcessorComponentConfig`](../type-aliases/RightsManagementPolicyEnforcementProcessorComponentConfig.md)\>[]

Rights management policy enforcement processor options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPolicyExecutionActionComponent?

> `optional` **rightsManagementPolicyExecutionActionComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPolicyExecutionActionComponentConfig`](../type-aliases/RightsManagementPolicyExecutionActionComponentConfig.md)\>[]

Rights management policy execution action options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPolicyInformationSourceComponent?

> `optional` **rightsManagementPolicyInformationSourceComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPolicyInformationSourceComponentConfig`](../type-aliases/RightsManagementPolicyInformationSourceComponentConfig.md)\>[]

Rights management policy information source options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPolicyNegotiatorComponent?

> `optional` **rightsManagementPolicyNegotiatorComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPolicyNegotiatorComponentConfig`](../type-aliases/RightsManagementPolicyNegotiatorComponentConfig.md)\>[]

Rights management policy negotiator options which can be overridden by individual components by specifying types other than default.

#### rightsManagementPolicyRequesterComponent?

> `optional` **rightsManagementPolicyRequesterComponent**: `IEngineCoreTypeConfig`\<[`RightsManagementPolicyRequesterComponentConfig`](../type-aliases/RightsManagementPolicyRequesterComponentConfig.md)\>[]

Rights management policy requester options which can be overridden by individual components by specifying types other than default.

#### synchronisedStorageComponent?

> `optional` **synchronisedStorageComponent**: `IEngineCoreTypeConfig`\<[`SynchronisedStorageComponentConfig`](../type-aliases/SynchronisedStorageComponentConfig.md)\>[]

Synchronised storage options which can be overridden by individual components by specifying types other than default.

#### federatedCatalogueComponent?

> `optional` **federatedCatalogueComponent**: `IEngineCoreTypeConfig`\<[`FederatedCatalogueComponentConfig`](../type-aliases/FederatedCatalogueComponentConfig.md)\>[]

Federated catalogue options which can be overridden by individual components by specifying types other than default.

#### federatedCatalogueFilterComponent?

> `optional` **federatedCatalogueFilterComponent**: `IEngineCoreTypeConfig`\<[`FederatedCatalogueFilterComponentConfig`](../type-aliases/FederatedCatalogueFilterComponentConfig.md)\>[]

Federated catalogue filter options which can be overridden by individual components by specifying types other than default.

#### dataspaceControlPlaneComponent?

> `optional` **dataspaceControlPlaneComponent**: `IEngineCoreTypeConfig`\<[`DataspaceControlPlaneComponentConfig`](../type-aliases/DataspaceControlPlaneComponentConfig.md)\>[]

Dataspace control plane component options which can be overridden by individual components by specifying types other than default.

#### dataspaceDataPlaneComponent?

> `optional` **dataspaceDataPlaneComponent**: `IEngineCoreTypeConfig`\<[`DataspaceDataPlaneComponentConfig`](../type-aliases/DataspaceDataPlaneComponentConfig.md)\>[]

Dataspace data plane component options which can be overridden by individual components by specifying types other than default.

#### tenantAdminComponent?

> `optional` **tenantAdminComponent**: `IEngineCoreTypeConfig`\<[`TenantAdminComponentConfig`](../type-aliases/TenantAdminComponentConfig.md)\>[]

Tenant admin component options which can be overridden by individual components by specifying types other than default.

#### contextIdHandlerComponent?

> `optional` **contextIdHandlerComponent**: `IEngineCoreTypeConfig`\<[`ContextIdHandlerComponentConfig`](../type-aliases/ContextIdHandlerComponentConfig.md)\>[]

Context Id Handler component options which can be overridden by individual components by specifying types other than default.

#### Overrides

`IEngineCoreConfig.types`
