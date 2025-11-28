// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineCoreConfig, IEngineCoreTypeConfig } from "@twin.org/engine-models";
import type { AttestationComponentConfig } from "./config/attestationComponentConfig.js";
import type { AttestationConnectorConfig } from "./config/attestationConnectorConfig.js";
import type { AuditableItemGraphComponentConfig } from "./config/auditableItemGraphComponentConfig.js";
import type { AuditableItemStreamComponentConfig } from "./config/auditableItemStreamComponentConfig.js";
import type { AuthenticationGeneratorComponentConfig } from "./config/authenticationGeneratorComponentConfig.js";
import type { BackgroundTaskComponentConfig } from "./config/backgroundTaskComponentConfig.js";
import type { BlobStorageComponentConfig } from "./config/blobStorageComponentConfig.js";
import type { BlobStorageConnectorConfig } from "./config/blobStorageConnectorConfig.js";
import type { ContextIdHandlerComponentConfig } from "./config/contextIdHandlerComponentConfig.js";
import type { DataConverterConnectorConfig } from "./config/dataConverterConnectorConfig.js";
import type { DataExtractorConnectorConfig } from "./config/dataExtractorConnectorConfig.js";
import type { DataProcessingComponentConfig } from "./config/dataProcessingComponentConfig.js";
import type { DataSpaceConnectorComponentConfig } from "./config/dataSpaceConnectorComponentConfig.js";
import type { DltConfig } from "./config/dltConfig.js";
import type { DocumentManagementComponentConfig } from "./config/documentManagementComponentConfig.js";
import type { EntityStorageComponentConfig } from "./config/entityStorageComponentConfig.js";
import type { EntityStorageConnectorConfig } from "./config/entityStorageConnectorConfig.js";
import type { EventBusComponentConfig } from "./config/eventBusComponentConfig.js";
import type { EventBusConnectorConfig } from "./config/eventBusConnectorConfig.js";
import type { FaucetConnectorConfig } from "./config/faucetConnectorConfig.js";
import type { FederatedCatalogueComponentConfig } from "./config/federatedCatalogueComponentConfig.js";
import type { FederatedCatalogueFilterComponentConfig } from "./config/federatedCatalogueFilterComponentConfig.js";
import type { IdentityComponentConfig } from "./config/identityComponentConfig.js";
import type { IdentityConnectorConfig } from "./config/identityConnectorConfig.js";
import type { IdentityProfileComponentConfig } from "./config/identityProfileComponentConfig.js";
import type { IdentityProfileConnectorConfig } from "./config/identityProfileConnectorConfig.js";
import type { IdentityResolverComponentConfig } from "./config/identityResolverComponentConfig.js";
import type { IdentityResolverConnectorConfig } from "./config/identityResolverConnectorConfig.js";
import type { ImmutableProofComponentConfig } from "./config/immutableProofComponentConfig.js";
import type { LoggingComponentConfig } from "./config/loggingComponentConfig.js";
import type { LoggingConnectorConfig } from "./config/loggingConnectorConfig.js";
import type { MessagingAdminComponentConfig } from "./config/messagingAdminComponentConfig.js";
import type { MessagingComponentConfig } from "./config/messagingComponentConfig.js";
import type { MessagingEmailConnectorConfig } from "./config/messagingEmailConnectorConfig.js";
import type { MessagingPushNotificationConnectorConfig } from "./config/messagingPushNotificationConnectorConfig.js";
import type { MessagingSmsConnectorConfig } from "./config/messagingSmsConnectorConfig.js";
import type { NftComponentConfig } from "./config/nftComponentConfig.js";
import type { NftConnectorConfig } from "./config/nftConnectorConfig.js";
import type { RightsManagementDapComponentConfig } from "./config/rightsManagementDapComponentConfig.js";
import type { RightsManagementDarpComponentConfig } from "./config/rightsManagementDarpComponentConfig.js";
import type { RightsManagementPapComponentConfig } from "./config/rightsManagementPapComponentConfig.js";
import type { RightsManagementPdpComponentConfig } from "./config/rightsManagementPdpComponentConfig.js";
import type { RightsManagementPepComponentConfig } from "./config/rightsManagementPepComponentConfig.js";
import type { RightsManagementPipComponentConfig } from "./config/rightsManagementPipComponentConfig.js";
import type { RightsManagementPmpComponentConfig } from "./config/rightsManagementPmpComponentConfig.js";
import type { RightsManagementPnapComponentConfig } from "./config/rightsManagementPnapComponentConfig.js";
import type { RightsManagementPnpComponentConfig } from "./config/rightsManagementPnpComponentConfig.js";
import type { RightsManagementPxpComponentConfig } from "./config/rightsManagementPxpComponentConfig.js";
import type { SynchronisedStorageComponentConfig } from "./config/synchronisedStorageComponentConfig.js";
import type { TaskSchedulerComponentConfig } from "./config/taskSchedulerComponentConfig.js";
import type { TelemetryComponentConfig } from "./config/telemetryComponentConfig.js";
import type { TelemetryConnectorConfig } from "./config/telemetryConnectorConfig.js";
import type { TenantAdminComponentConfig } from "./config/tenantAdminComponentConfig.js";
import type { VaultConnectorConfig } from "./config/vaultConnectorConfig.js";
import type { VerifiableStorageComponentConfig } from "./config/verifiableStorageComponentConfig.js";
import type { VerifiableStorageConnectorConfig } from "./config/verifiableStorageConnectorConfig.js";
import type { WalletConnectorConfig } from "./config/walletConnectorConfig.js";

/**
 * Extended engine core config with known types.
 */
export interface IEngineConfig extends IEngineCoreConfig {
	/**
	 * The types to initialise in the engine.
	 */
	types: {
		[type: string]: IEngineCoreTypeConfig[] | undefined;

		/**
		 * Logging connector options which can be overridden by individual components by specifying types other than default.
		 */
		loggingConnector?: IEngineCoreTypeConfig<LoggingConnectorConfig>[];

		/**
		 * Logging component options which can be overridden by individual components by specifying types other than default.
		 */
		loggingComponent?: IEngineCoreTypeConfig<LoggingComponentConfig>[];

		/**
		 * Entity storage connector options which can be overridden by individual components by specifying types other than default.
		 */
		entityStorageConnector?: IEngineCoreTypeConfig<EntityStorageConnectorConfig>[];

		/**
		 * Entity storage component options which can be overridden by individual components by specifying types other than default.
		 */
		entityStorageComponent?: IEngineCoreTypeConfig<EntityStorageComponentConfig>[];

		/**
		 * Blob storage connector options which can be overridden by individual components by specifying types other than default.
		 */
		blobStorageConnector?: IEngineCoreTypeConfig<BlobStorageConnectorConfig>[];

		/**
		 * Blob storage component options which can be overridden by individual components by specifying types other than default.
		 */
		blobStorageComponent?: IEngineCoreTypeConfig<BlobStorageComponentConfig>[];

		/**
		 * Telemetry connector options which can be overridden by individual components by specifying types other than default.
		 */
		telemetryConnector?: IEngineCoreTypeConfig<TelemetryConnectorConfig>[];

		/**
		 * Telemetry component options which can be overridden by individual components by specifying types other than default.
		 */
		telemetryComponent?: IEngineCoreTypeConfig<TelemetryComponentConfig>[];

		/**
		 * Messaging email connector options which can be overridden by individual components by specifying types other than default.
		 */
		messagingEmailConnector?: IEngineCoreTypeConfig<MessagingEmailConnectorConfig>[];

		/**
		 * Messaging SMS connector options which can be overridden by individual components by specifying types other than default.
		 */
		messagingSmsConnector?: IEngineCoreTypeConfig<MessagingSmsConnectorConfig>[];

		/**
		 * Messaging push notification connector options which can be overridden by individual components by specifying types other than default.
		 */
		messagingPushNotificationConnector?: IEngineCoreTypeConfig<MessagingPushNotificationConnectorConfig>[];

		/**
		 * Messaging admin component options which can be overridden by individual components by specifying types other than default.
		 */
		messagingAdminComponent?: IEngineCoreTypeConfig<MessagingAdminComponentConfig>[];

		/**
		 * Messaging component options which can be overridden by individual components by specifying types other than default.
		 */
		messagingComponent?: IEngineCoreTypeConfig<MessagingComponentConfig>[];

		/**
		 * Background task component options which can be overridden by individual components by specifying types other than default.
		 */
		backgroundTaskComponent?: IEngineCoreTypeConfig<BackgroundTaskComponentConfig>[];

		/**
		 * Task scheduler component options which can be overridden by individual components by specifying types other than default.
		 */
		taskSchedulerComponent?: IEngineCoreTypeConfig<TaskSchedulerComponentConfig>[];

		/**
		 * Event bus connector options which can be overridden by individual components by specifying types other than default.
		 */
		eventBusConnector?: IEngineCoreTypeConfig<EventBusConnectorConfig>[];

		/**
		 * Event bus component options which can be overridden by individual components by specifying types other than default.
		 */
		eventBusComponent?: IEngineCoreTypeConfig<EventBusComponentConfig>[];

		/**
		 * Vault connector options which can be overridden by individual components by specifying types other than default.
		 */
		vaultConnector?: IEngineCoreTypeConfig<VaultConnectorConfig>[];

		/**
		 * DLT options which can be overridden by individual components by specifying types other than default.
		 */
		dltConfig?: IEngineCoreTypeConfig<DltConfig>[];

		/**
		 * Wallet connector options which can be overridden by individual components by specifying types other than default.
		 */
		walletConnector?: IEngineCoreTypeConfig<WalletConnectorConfig>[];

		/**
		 * Verifiable storage connector options which can be overridden by individual components by specifying types other than default.
		 */
		verifiableStorageConnector?: IEngineCoreTypeConfig<VerifiableStorageConnectorConfig>[];

		/**
		 * Verifiable storage component options which can be overridden by individual components by specifying types other than default.
		 */
		verifiableStorageComponent?: IEngineCoreTypeConfig<VerifiableStorageComponentConfig>[];

		/**
		 * Immutable proof component options which can be overridden by individual components by specifying types other than default.
		 */
		immutableProofComponent?: IEngineCoreTypeConfig<ImmutableProofComponentConfig>[];

		/**
		 * Faucet connector options which can be overridden by individual components by specifying types other than default.
		 */
		faucetConnector?: IEngineCoreTypeConfig<FaucetConnectorConfig>[];

		/**
		 * Identity connector options which can be overridden by individual components by specifying types other than default.
		 */
		identityConnector?: IEngineCoreTypeConfig<IdentityConnectorConfig>[];

		/**
		 * Identity component options which can be overridden by individual components by specifying types other than default.
		 */
		identityComponent?: IEngineCoreTypeConfig<IdentityComponentConfig>[];

		/**
		 * Identity resolver connector options which can be overridden by individual components by specifying types other than default.
		 */
		identityResolverConnector?: IEngineCoreTypeConfig<IdentityResolverConnectorConfig>[];

		/**
		 * Identity resolver component options which can be overridden by individual components by specifying types other than default.
		 */
		identityResolverComponent?: IEngineCoreTypeConfig<IdentityResolverComponentConfig>[];

		/**
		 * Identity profile connector options which can be overridden by individual components by specifying types other than default.
		 */
		identityProfileConnector?: IEngineCoreTypeConfig<IdentityProfileConnectorConfig>[];

		/**
		 * Identity profile component options which can be overridden by individual components by specifying types other than default.
		 */
		identityProfileComponent?: IEngineCoreTypeConfig<IdentityProfileComponentConfig>[];

		/**
		 * NFT connector options which can be overridden by individual components by specifying types other than default.
		 */
		nftConnector?: IEngineCoreTypeConfig<NftConnectorConfig>[];

		/**
		 * NFT component options which can be overridden by individual components by specifying types other than default.
		 */
		nftComponent?: IEngineCoreTypeConfig<NftComponentConfig>[];

		/**
		 * Attestation connector options which can be overridden by individual components by specifying types other than default.
		 */
		attestationConnector?: IEngineCoreTypeConfig<AttestationConnectorConfig>[];

		/**
		 * Attestation component options which can be overridden by individual components by specifying types other than default.
		 */
		attestationComponent?: IEngineCoreTypeConfig<AttestationComponentConfig>[];

		/**
		 * Auditable item graph component options which can be overridden by individual components by specifying types other than default.
		 */
		auditableItemGraphComponent?: IEngineCoreTypeConfig<AuditableItemGraphComponentConfig>[];

		/**
		 * Auditable item stream component  options which can be overridden by individual components by specifying types other than default.
		 */
		auditableItemStreamComponent?: IEngineCoreTypeConfig<AuditableItemStreamComponentConfig>[];

		/**
		 * Data converter connector options which can be overridden by individual components by specifying types other than default.
		 */
		dataConverterConnector?: IEngineCoreTypeConfig<DataConverterConnectorConfig>[];

		/**
		 * Data extractor connector options which can be overridden by individual components by specifying types other than default.
		 */
		dataExtractorConnector?: IEngineCoreTypeConfig<DataExtractorConnectorConfig>[];

		/**
		 * Date processing options which can be overridden by individual components by specifying types other than default.
		 */
		dataProcessingComponent?: IEngineCoreTypeConfig<DataProcessingComponentConfig>[];

		/**
		 * Document management options which can be overridden by individual components by specifying types other than default.
		 */
		documentManagementComponent?: IEngineCoreTypeConfig<DocumentManagementComponentConfig>[];

		/**
		 * Authentication generator options which can be overridden by individual components by specifying types other than default.
		 */
		authenticationGeneratorComponent?: IEngineCoreTypeConfig<AuthenticationGeneratorComponentConfig>[];

		/**
		 * Rights management PAP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPapComponent?: IEngineCoreTypeConfig<RightsManagementPapComponentConfig>[];

		/**
		 * Rights management PDP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPdpComponent?: IEngineCoreTypeConfig<RightsManagementPdpComponentConfig>[];

		/**
		 * Rights management PEP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPepComponent?: IEngineCoreTypeConfig<RightsManagementPepComponentConfig>[];

		/**
		 * Rights management PIP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPipComponent?: IEngineCoreTypeConfig<RightsManagementPipComponentConfig>[];

		/**
		 * Rights management PMP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPmpComponent?: IEngineCoreTypeConfig<RightsManagementPmpComponentConfig>[];

		/**
		 * Rights management PXP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPxpComponent?: IEngineCoreTypeConfig<RightsManagementPxpComponentConfig>[];

		/**
		 * Rights management PNP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPnpComponent?: IEngineCoreTypeConfig<RightsManagementPnpComponentConfig>[];

		/**
		 * Rights management PNAP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementPnapComponent?: IEngineCoreTypeConfig<RightsManagementPnapComponentConfig>[];

		/**
		 * Rights management DAP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementDapComponent?: IEngineCoreTypeConfig<RightsManagementDapComponentConfig>[];

		/**
		 * Rights management DARP options which can be overridden by individual components by specifying types other than default.
		 */
		rightsManagementDarpComponent?: IEngineCoreTypeConfig<RightsManagementDarpComponentConfig>[];

		/**
		 * Synchronised storage options which can be overridden by individual components by specifying types other than default.
		 */
		synchronisedStorageComponent?: IEngineCoreTypeConfig<SynchronisedStorageComponentConfig>[];

		/**
		 * Federated catalogue options which can be overridden by individual components by specifying types other than default.
		 */
		federatedCatalogueComponent?: IEngineCoreTypeConfig<FederatedCatalogueComponentConfig>[];

		/**
		 * Federated catalogue filter options which can be overridden by individual components by specifying types other than default.
		 */
		federatedCatalogueFilterComponent?: IEngineCoreTypeConfig<FederatedCatalogueFilterComponentConfig>[];

		/**
		 * Data space connector options which can be overridden by individual components by specifying types other than default.
		 */
		dataSpaceConnectorComponent?: IEngineCoreTypeConfig<DataSpaceConnectorComponentConfig>[];

		/**
		 * Tenant admin component options which can be overridden by individual components by specifying types other than default.
		 */
		tenantAdminComponent?: IEngineCoreTypeConfig<TenantAdminComponentConfig>[];

		/**
		 * Context Id Handler component options which can be overridden by individual components by specifying types other than default.
		 */
		contextIdHandlerComponent?: IEngineCoreTypeConfig<ContextIdHandlerComponentConfig>[];
	};
}
