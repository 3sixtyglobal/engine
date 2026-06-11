// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rm } from "node:fs/promises";
import { AutomationActionFactory } from "@twin.org/automation-models";
import { ContextIdHandlerFactory, ContextIdKeys, ContextIdStore } from "@twin.org/context";
import { ComponentFactory, Factory, I18n } from "@twin.org/core";
import { MemoryStateStorage } from "@twin.org/engine-core";
import coreLocales from "@twin.org/engine-core/locales/en.json" with { type: "json" };
import {
	AttestationComponentType,
	AttestationConnectorType,
	AuditableItemGraphComponentType,
	AuditableItemStreamComponentType,
	AutomationActionType,
	AutomationComponentType,
	BackgroundTaskComponentType,
	BlobStorageComponentType,
	BlobStorageConnectorType,
	ContextIdHandlerComponentType,
	DataConverterConnectorType,
	DataExtractorConnectorType,
	DataProcessingComponentType,
	DataspaceControlPlaneComponentType,
	DataspaceDataPlaneComponentType,
	DocumentManagementComponentType,
	EntityStorageComponentType,
	EntityStorageConnectorType,
	EventBusComponentType,
	EventBusConnectorType,
	FaucetConnectorType,
	FederatedCatalogueComponentType,
	FederatedCatalogueFilterComponentType,
	HealthComponentType,
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	IdentityResolverComponentType,
	IdentityResolverConnectorType,
	type IEngineConfig,
	ImmutableProofComponentType,
	LoggingComponentType,
	LoggingConnectorType,
	MessagingAdminComponentType,
	MessagingComponentType,
	MessagingEmailConnectorType,
	MessagingPushNotificationConnectorType,
	MessagingSmsConnectorType,
	MetricsCollectorComponentType,
	MetricsProducerComponentType,
	NftComponentType,
	NftConnectorType,
	NotarizationComponentType,
	NotarizationConnectorType,
	PlatformComponentType,
	RightsManagementPapComponentType,
	RightsManagementPdpComponentType,
	RightsManagementPepComponentType,
	RightsManagementPipComponentType,
	RightsManagementPmpComponentType,
	RightsManagementPnapComponentType,
	RightsManagementPnpComponentType,
	RightsManagementPolicyArbiterComponentType,
	RightsManagementPolicyEnforcementProcessorComponentType,
	RightsManagementPolicyExecutionActionComponentType,
	RightsManagementPolicyInformationSourceComponentType,
	RightsManagementPolicyNegotiatorComponentType,
	RightsManagementPolicyObligationEnforcerComponentType,
	RightsManagementPolicyRequesterComponentType,
	RightsManagementPxpComponentType,
	SchemaVersionMigrationComponentType,
	TaskSchedulerComponentType,
	TelemetryComponentType,
	TelemetryConnectorType,
	TenantAdminComponentType,
	TrustComponentType,
	TrustGeneratorComponentType,
	TrustVerifierComponentType,
	VaultConnectorType,
	WalletConnectorType
} from "@twin.org/engine-types";
import typeLocales from "@twin.org/engine-types/locales/en.json" with { type: "json" };
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type {
	IEntityStorageComponent,
	IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import {
	EntityStorageConnectorFactory,
	SchemaMigrationFactory
} from "@twin.org/entity-storage-models";
import { SchemaVersion } from "@twin.org/entity-storage-service";
import { FederatedCatalogueFilterFactory } from "@twin.org/federated-catalogue-models";
import { nameof, nameofKebabCase } from "@twin.org/nameof";
import {
	PolicyArbiterFactory,
	PolicyEnforcementProcessorFactory,
	PolicyExecutionActionFactory,
	PolicyInformationSourceFactory,
	PolicyNegotiatorFactory,
	PolicyRequesterFactory
} from "@twin.org/rights-management-models";
import { MetricsProducerFactory } from "@twin.org/telemetry-models";
import { TrustGeneratorFactory, TrustVerifierFactory } from "@twin.org/trust-models";
import { Engine } from "../src/engine.js";

/**
 * Class representing information for a test entity.
 */
@entity()
export class TestEntity {
	/**
	 * The id for the entity.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;
}

/**
 * Class representing v0 of a versioned test entity, used to test schema migration.
 */
@entity({ version: 0 })
export class TestMigrationEntityV0 {
	/**
	 * The id for the entity.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * A field present in v0 that is renamed to newField during migration to v1.
	 */
	@property({ type: "string" })
	public legacyField!: string;

	/**
	 * A numeric field in v0 that is transformed into an array of tag strings during migration to v1.
	 */
	@property({ type: "integer" })
	public score!: number;
}

/**
 * Class representing the current (v1) schema of a versioned test entity, used to test schema migration.
 */
@entity({ version: 1 })
export class TestMigrationEntity {
	/**
	 * The id for the entity.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The renamed field (was legacyField in v0).
	 */
	@property({ type: "string" })
	public newField!: string;

	/**
	 * Tag strings produced by transformEntityProperty from the v0 score integer.
	 */
	@property({ type: "array", itemType: "string", optional: true })
	public tags?: string[];
}

describe("engine", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", { ...coreLocales, ...typeLocales });

		ContextIdStore.getContextIds = vi.fn().mockImplementation(() => ({
			node: "did:iota:0x123",
			tenant: "00000000000000000000000000000123"
		}));
	});

	beforeEach(async () => {
		Factory.clearFactories();
		await mkdir("tests/.tmp", { recursive: true });
	});

	afterEach(async () => {
		await rm("tests/.tmp", { recursive: true });
	});

	test("Can start engine with no config", async () => {
		const engine = new Engine();
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Can start engine with empty config", async () => {
		const engine = new Engine({ config: { types: {} } });
		await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
	});

	test("Can start engine with config", async () => {
		let calledCustomBootstrap = false;

		const engine = new Engine({
			config: {
				debug: true,
				types: {
					platformComponent: [{ type: PlatformComponentType.Service }],
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [{ type: LoggingComponentType.Service }],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					schemaVersionMigrationComponent: [{ type: SchemaVersionMigrationComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [{ type: TelemetryComponentType.Service }],
					metricsCollectorComponent: [{ type: MetricsCollectorComponentType.Service }],
					metricsProducerComponent: [{ type: MetricsProducerComponentType.System }],
					automationComponent: [{ type: AutomationComponentType.Service }],
					automationAction: [
						{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
					],
					healthComponent: [{ type: HealthComponentType.Service }],
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [{ type: IdentityComponentType.Service }],
					identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
					identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [{ type: NftComponentType.Service }],
					notarizationConnector: [{ type: NotarizationConnectorType.EntityStorage }],
					notarizationComponent: [{ type: NotarizationComponentType.Service }],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [{ type: AttestationComponentType.Service }],
					auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
					auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
					documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
					trustComponent: [
						{
							type: TrustComponentType.Service
						}
					],
					trustGeneratorComponent: [
						{
							type: TrustGeneratorComponentType.JwtVerifiableCredential,
							options: { config: { verificationMethodId: "foo" } }
						}
					],
					trustVerifierComponent: [
						{
							type: TrustVerifierComponentType.JwtVerifiableCredential
						}
					],
					rightsManagementPapComponent: [
						{
							type: RightsManagementPapComponentType.Service
						}
					],
					rightsManagementPepComponent: [
						{
							type: RightsManagementPepComponentType.Service
						}
					],
					rightsManagementPdpComponent: [
						{
							type: RightsManagementPdpComponentType.Service
						}
					],
					rightsManagementPipComponent: [
						{
							type: RightsManagementPipComponentType.Service
						}
					],
					rightsManagementPxpComponent: [
						{
							type: RightsManagementPxpComponentType.Service
						}
					],
					rightsManagementPmpComponent: [
						{
							type: RightsManagementPmpComponentType.Service
						}
					],
					rightsManagementPnpComponent: [
						{
							type: RightsManagementPnpComponentType.RestClient,
							options: {
								endpoint: "http://localhost"
							},
							features: ["remote"]
						},
						{
							type: RightsManagementPnpComponentType.Service,
							options: {
								config: {
									callbackPath: ""
								}
							}
						}
					],
					rightsManagementPnapComponent: [
						{
							type: RightsManagementPnapComponentType.Service
						}
					],
					rightsManagementPolicyArbiterComponent: [
						{
							type: RightsManagementPolicyArbiterComponentType.PassThrough
						}
					],
					rightsManagementPolicyObligationEnforcerComponent: [
						{
							type: RightsManagementPolicyObligationEnforcerComponentType.PassThrough
						}
					],
					rightsManagementPolicyEnforcementProcessorComponent: [
						{
							type: RightsManagementPolicyEnforcementProcessorComponentType.PassThrough
						}
					],
					rightsManagementPolicyExecutionActionComponent: [
						{
							type: RightsManagementPolicyExecutionActionComponentType.Logging
						}
					],
					rightsManagementPolicyInformationSourceComponent: [
						{
							type: RightsManagementPolicyInformationSourceComponentType.Identity
						},
						{
							type: RightsManagementPolicyInformationSourceComponentType.Static
						}
					],
					rightsManagementPolicyNegotiatorComponent: [
						{
							type: RightsManagementPolicyNegotiatorComponentType.PassThrough
						}
					],
					rightsManagementPolicyRequesterComponent: [
						{
							type: RightsManagementPolicyRequesterComponentType.PassThrough
						}
					],
					taskSchedulerComponent: [
						{
							type: TaskSchedulerComponentType.Service
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: {}
						}
					],
					federatedCatalogueFilterComponent: [
						{
							type: FederatedCatalogueFilterComponentType.FilterByMetadata,
							options: {}
						}
					],
					dataspaceControlPlaneComponent: [
						{
							type: DataspaceControlPlaneComponentType.Service
						}
					],
					dataspaceDataPlaneComponent: [
						{
							type: DataspaceDataPlaneComponentType.Service
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});

		engine.addContextId(ContextIdKeys.Node, "did:iota:0x123");

		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"engine-logging-service",
			"schema-version-service",
			"platform-service",
			"logging-service",
			"background-task-service",
			"task-scheduler-service",
			"event-bus-service",
			"telemetry-service",
			"metrics-collector-service",
			"automation-service",
			"messaging-admin-service",
			"messaging-service",
			"blob-storage-service",
			"identity-service",
			"identity-resolver-service",
			"identity-profile-service",
			"nft-service",
			"notarization-service",
			"immutable-proof-service",
			"attestation-service",
			"auditable-item-graph-service",
			"auditable-item-stream-service",
			"data-processing-service",
			"health-service",
			"document-management-service",
			"trust-service",
			"policy-administration-point-service",
			"policy-management-point-service",
			"policy-execution-point-service",
			"policy-information-point-service",
			"policy-decision-point-service",
			"policy-enforcement-point-service",
			"policy-negotiation-admin-point-service",
			"policy-negotiation-point-rest-client",
			"policy-negotiation-point-service",
			"federated-catalogue-service",
			"dataspace-control-plane-service",
			"dataspace-data-plane-service"
		]);

		expect(EntitySchemaFactory.names().filter(n => !/V(\d)+$/.test(n))).toEqual([
			"SchemaVersion",
			"Tenant",
			"BackgroundTask",
			"ScheduledTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"AutomationActionEntry",
			"EmailEntry",
			"SmsEntry",
			"PushNotificationDeviceEntry",
			"PushNotificationMessageEntry",
			"TemplateEntry",
			"VaultKey",
			"VaultSecret",
			"BlobStorageEntry",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft",
			"Notarization",
			"ImmutableProof",
			"AuditableItemGraphVertex",
			"AuditableItemGraphAlias",
			"AuditableItemGraphResource",
			"AuditableItemGraphEdge",
			"AuditableItemGraphChangeset",
			"AuditableItemGraphPatch",
			"AuditableItemStream",
			"AuditableItemStreamEntry",
			"ExtractionRuleGroup",
			"ExtractionRule",
			"OdrlPolicy",
			"PolicyNegotiation",
			"Dataset",
			"TransferProcess",
			"DataspaceAppDataset",
			"ActivityLogDetails",
			"ActivityTask",
			"PushSubscription"
		]);

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();

		expect(FederatedCatalogueFilterFactory.names()).toEqual(["FilterByMetadata"]);

		expect(PolicyArbiterFactory.names()).toEqual(["pass-through-policy-arbiter"]);
		expect(PolicyEnforcementProcessorFactory.names()).toEqual([
			"pass-through-policy-enforcement-processor"
		]);
		expect(PolicyExecutionActionFactory.names()).toEqual(["logging-policy-execution-action"]);
		expect(PolicyInformationSourceFactory.names()).toEqual([
			"identity-policy-information-source",
			"static-policy-information-source"
		]);
		expect(PolicyNegotiatorFactory.names()).toEqual(["pass-through-policy-negotiator"]);
		expect(PolicyRequesterFactory.names()).toEqual([
			"pass-through-policy-requester",
			"dataspace-control-plane-requester"
		]);

		expect(TrustGeneratorFactory.names()).toEqual(["jwt-verifiable-credential-generator"]);
		expect(TrustVerifierFactory.names()).toEqual(["jwt-verifiable-credential-verifier"]);

		expect(AutomationActionFactory.names()).toEqual(["fetch-action"]);

		expect(MetricsProducerFactory.names()).toEqual(["system-metrics-producer"]);
	});

	test("Can start engine with custom entity storage", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				types: {
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					entityStorageComponent: [
						{
							type: EntityStorageComponentType.Service,
							options: {
								entityStorageType: nameof<TestEntity>(),
								partitionContextIds: [ContextIdKeys.Node]
							}
						}
					]
				}
			}
		});

		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual(["engine-logging-service", "test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual(["TestEntity"]);
	});

	test("Can start engine with custom entity storage and custom store", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				silent: true,
				types: {
					entityStorageConnector: [
						{ type: EntityStorageConnectorType.Memory },
						{
							type: EntityStorageConnectorType.File,
							options: {
								config: {
									directory: "tests/.tmp"
								}
							},
							overrideInstanceType: "test-entity"
						}
					],
					entityStorageComponent: [
						{
							type: EntityStorageComponentType.Service,
							options: {
								entityStorageType: nameof<TestEntity>(),
								partitionContextIds: [ContextIdKeys.Node]
							}
						}
					]
				}
			}
		});
		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual(["engine-logging-service", "test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual(["TestEntity"]);

		const service = ComponentFactory.get<IEntityStorageComponent<TestEntity>>("test-entity");
		await service.set({ id: "test" });

		const item = await service.get("test");
		expect(item?.id).toEqual("test");
	});

	test("Can clone the engine", async () => {
		const engine = new Engine({
			config: {
				debug: true,
				types: {
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [{ type: LoggingComponentType.Service }],
					platformComponent: [{ type: PlatformComponentType.Service }],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					schemaVersionMigrationComponent: [{ type: SchemaVersionMigrationComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [{ type: TelemetryComponentType.Service }],
					metricsCollectorComponent: [{ type: MetricsCollectorComponentType.Service }],
					metricsProducerComponent: [{ type: MetricsProducerComponentType.System }],
					automationComponent: [{ type: AutomationComponentType.Service }],
					automationAction: [
						{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
					],
					healthComponent: [{ type: HealthComponentType.Service }],
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [{ type: IdentityComponentType.Service }],
					identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
					identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [{ type: NftComponentType.Service }],
					notarizationConnector: [{ type: NotarizationConnectorType.EntityStorage }],
					notarizationComponent: [{ type: NotarizationComponentType.Service }],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [{ type: AttestationComponentType.Service }],
					auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
					auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
					documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
					trustComponent: [
						{
							type: TrustComponentType.Service
						}
					],
					rightsManagementPapComponent: [
						{
							type: RightsManagementPapComponentType.Service
						}
					],
					rightsManagementPepComponent: [
						{
							type: RightsManagementPepComponentType.Service
						}
					],
					rightsManagementPdpComponent: [
						{
							type: RightsManagementPdpComponentType.Service
						}
					],
					rightsManagementPipComponent: [
						{
							type: RightsManagementPipComponentType.Service
						}
					],
					rightsManagementPxpComponent: [
						{
							type: RightsManagementPxpComponentType.Service
						}
					],
					rightsManagementPmpComponent: [
						{
							type: RightsManagementPmpComponentType.Service
						}
					],
					rightsManagementPnpComponent: [
						{
							type: RightsManagementPnpComponentType.RestClient,
							options: {
								endpoint: "http://localhost"
							},
							features: ["remote"]
						},
						{
							type: RightsManagementPnpComponentType.Service,
							options: {
								config: {
									callbackPath: ""
								}
							}
						}
					],
					rightsManagementPnapComponent: [
						{
							type: RightsManagementPnapComponentType.Service
						}
					],
					rightsManagementPolicyArbiterComponent: [
						{
							type: RightsManagementPolicyArbiterComponentType.PassThrough
						}
					],
					rightsManagementPolicyObligationEnforcerComponent: [
						{
							type: RightsManagementPolicyObligationEnforcerComponentType.PassThrough
						}
					],
					rightsManagementPolicyEnforcementProcessorComponent: [
						{
							type: RightsManagementPolicyEnforcementProcessorComponentType.PassThrough
						}
					],
					rightsManagementPolicyExecutionActionComponent: [
						{
							type: RightsManagementPolicyExecutionActionComponentType.Logging
						}
					],
					rightsManagementPolicyInformationSourceComponent: [
						{
							type: RightsManagementPolicyInformationSourceComponentType.Identity
						},
						{
							type: RightsManagementPolicyInformationSourceComponentType.Static
						}
					],
					rightsManagementPolicyNegotiatorComponent: [
						{
							type: RightsManagementPolicyNegotiatorComponentType.PassThrough
						}
					],
					rightsManagementPolicyRequesterComponent: [
						{
							type: RightsManagementPolicyRequesterComponentType.PassThrough
						}
					],
					taskSchedulerComponent: [
						{
							type: TaskSchedulerComponentType.Service
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: {}
						}
					],
					federatedCatalogueFilterComponent: [
						{
							type: FederatedCatalogueFilterComponentType.FilterByMetadata,
							options: {}
						}
					],
					dataspaceControlPlaneComponent: [
						{
							type: DataspaceControlPlaneComponentType.Service
						}
					],
					dataspaceDataPlaneComponent: [
						{
							type: DataspaceDataPlaneComponentType.Service
						}
					],
					tenantAdminComponent: [
						{
							type: TenantAdminComponentType.Service
						}
					],
					contextIdHandlerComponent: [
						{
							type: ContextIdHandlerComponentType.Did,
							features: ["did"]
						},
						{
							type: ContextIdHandlerComponentType.Tenant,
							features: ["tenant"]
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage()
		});

		engine.addContextIdKey(ContextIdKeys.Node, ["did"]);
		engine.addContextIdKey(ContextIdKeys.Tenant, ["tenant"]);
		engine.addContextId(ContextIdKeys.Node, "did:iota:0x123");
		engine.addContextId(ContextIdKeys.Tenant, "00000000000000000000000000000123");

		await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData, {
			[ContextIdKeys.Node]: "did:iota:0x123",
			[ContextIdKeys.Tenant]: "00000000000000000000000000000123"
		});

		await clone.start();

		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getRegisteredInstances()).toEqual(engine.getRegisteredInstances());

		expect(ContextIdHandlerFactory.names()).toEqual(["node", "tenant"]);
		expect(ContextIdHandlerFactory.get("node").className()).toEqual("DidContextIdHandler");
		expect(ContextIdHandlerFactory.get("tenant").className()).toEqual("TenantIdContextIdHandler");
	});

	test("Can clone the engine and silence it", async () => {
		const config: IEngineConfig = {
			debug: true,
			silent: false,
			types: {
				platformComponent: [{ type: PlatformComponentType.Service }],
				loggingConnector: [{ type: LoggingConnectorType.Console }],
				loggingComponent: [{ type: LoggingComponentType.Service }],
				entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
				blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
				blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
				schemaVersionMigrationComponent: [{ type: SchemaVersionMigrationComponentType.Service }],
				backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
				eventBusConnector: [{ type: EventBusConnectorType.Local }],
				eventBusComponent: [{ type: EventBusComponentType.Service }],
				telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
				telemetryComponent: [{ type: TelemetryComponentType.Service }],
				metricsCollectorComponent: [{ type: MetricsCollectorComponentType.Service }],
				metricsProducerComponent: [{ type: MetricsProducerComponentType.System }],
				automationComponent: [{ type: AutomationComponentType.Service }],
				automationAction: [
					{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
				],
				healthComponent: [{ type: HealthComponentType.Service }],
				messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
				messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
				messagingPushNotificationConnector: [
					{ type: MessagingPushNotificationConnectorType.EntityStorage }
				],
				messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
				messagingComponent: [{ type: MessagingComponentType.Service }],
				vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
				immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
				walletConnector: [{ type: WalletConnectorType.EntityStorage }],
				faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
				identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
				identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
				identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
				identityComponent: [{ type: IdentityComponentType.Service }],
				identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
				identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
				nftConnector: [{ type: NftConnectorType.EntityStorage }],
				nftComponent: [{ type: NftComponentType.Service }],
				notarizationConnector: [{ type: NotarizationConnectorType.EntityStorage }],
				notarizationComponent: [{ type: NotarizationComponentType.Service }],
				attestationConnector: [{ type: AttestationConnectorType.Nft }],
				attestationComponent: [{ type: AttestationComponentType.Service }],
				auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
				auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
				dataConverterConnector: [
					{ type: DataConverterConnectorType.Json },
					{ type: DataConverterConnectorType.Xml }
				],
				dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
				dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
				documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
				trustComponent: [
					{
						type: TrustComponentType.Service
					}
				],
				rightsManagementPapComponent: [
					{
						type: RightsManagementPapComponentType.Service
					}
				],
				rightsManagementPepComponent: [
					{
						type: RightsManagementPepComponentType.Service
					}
				],
				rightsManagementPdpComponent: [
					{
						type: RightsManagementPdpComponentType.Service
					}
				],
				rightsManagementPipComponent: [
					{
						type: RightsManagementPipComponentType.Service
					}
				],
				rightsManagementPxpComponent: [
					{
						type: RightsManagementPxpComponentType.Service
					}
				],
				rightsManagementPmpComponent: [
					{
						type: RightsManagementPmpComponentType.Service
					}
				],
				rightsManagementPnpComponent: [
					{
						type: RightsManagementPnpComponentType.RestClient,
						options: {
							endpoint: "http://localhost"
						},
						features: ["remote"]
					},
					{
						type: RightsManagementPnpComponentType.Service,
						options: {
							config: {
								callbackPath: ""
							}
						}
					}
				],
				rightsManagementPnapComponent: [
					{
						type: RightsManagementPnapComponentType.Service
					}
				],
				rightsManagementPolicyArbiterComponent: [
					{
						type: RightsManagementPolicyArbiterComponentType.PassThrough
					}
				],
				rightsManagementPolicyObligationEnforcerComponent: [
					{
						type: RightsManagementPolicyObligationEnforcerComponentType.PassThrough
					}
				],
				rightsManagementPolicyEnforcementProcessorComponent: [
					{
						type: RightsManagementPolicyEnforcementProcessorComponentType.PassThrough
					}
				],
				rightsManagementPolicyExecutionActionComponent: [
					{
						type: RightsManagementPolicyExecutionActionComponentType.Logging
					}
				],
				rightsManagementPolicyInformationSourceComponent: [
					{
						type: RightsManagementPolicyInformationSourceComponentType.Identity
					},
					{
						type: RightsManagementPolicyInformationSourceComponentType.Static
					}
				],
				rightsManagementPolicyNegotiatorComponent: [
					{
						type: RightsManagementPolicyNegotiatorComponentType.PassThrough
					}
				],
				rightsManagementPolicyRequesterComponent: [
					{
						type: RightsManagementPolicyRequesterComponentType.PassThrough
					}
				],
				taskSchedulerComponent: [
					{
						type: TaskSchedulerComponentType.Service
					}
				],
				federatedCatalogueComponent: [
					{
						type: FederatedCatalogueComponentType.Service,
						options: {}
					}
				],
				federatedCatalogueFilterComponent: [
					{
						type: FederatedCatalogueFilterComponentType.FilterByMetadata,
						options: {}
					}
				],

				dataspaceControlPlaneComponent: [
					{
						type: DataspaceControlPlaneComponentType.Service
					}
				],
				dataspaceDataPlaneComponent: [
					{
						type: DataspaceDataPlaneComponentType.Service
					}
				]
			}
		};
		const engine = new Engine({
			config,
			stateStorage: new MemoryStateStorage()
		});

		engine.addContextId(ContextIdKeys.Node, "did:iota:0x123");

		await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData, { [ContextIdKeys.Node]: "did:iota:0x123" }, true);
		await clone.start();

		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getRegisteredInstances()).toEqual(engine.getRegisteredInstances());
	});

	test("Can start engine with REST client config", async () => {
		let calledCustomBootstrap = false;

		const engine = new Engine({
			config: {
				debug: true,
				types: {
					platformComponent: [{ type: PlatformComponentType.Service }],
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [
						{
							type: LoggingComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [
						{
							type: BlobStorageComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					schemaVersionMigrationComponent: [{ type: SchemaVersionMigrationComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					automationComponent: [{ type: AutomationComponentType.Service }],
					automationAction: [
						{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
					],
					healthComponent: [{ type: HealthComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [
						{
							type: EventBusComponentType.SocketClient,
							options: { config: { endpoint: "http://localhost:3000" } }
						}
					],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [
						{
							type: TelemetryComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					metricsCollectorComponent: [{ type: MetricsCollectorComponentType.Service }],
					metricsProducerComponent: [], // No REST client available for metrics producer
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					immutableProofComponent: [
						{
							type: ImmutableProofComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [
						{
							type: IdentityComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					identityResolverComponent: [
						{
							type: IdentityResolverComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					identityProfileComponent: [
						{
							type: IdentityProfileComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [
						{ type: NftComponentType.RestClient, options: { endpoint: "http://localhost:3000" } }
					],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [
						{
							type: AttestationComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					auditableItemGraphComponent: [
						{
							type: AuditableItemGraphComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					auditableItemStreamComponent: [
						{
							type: AuditableItemStreamComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [
						{
							type: DataProcessingComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					documentManagementComponent: [
						{
							type: DocumentManagementComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					trustComponent: [
						{
							type: TrustComponentType.Service
						}
					],
					rightsManagementPapComponent: [
						{
							type: RightsManagementPapComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					rightsManagementPepComponent: [
						{
							type: RightsManagementPepComponentType.Service
						}
					],
					rightsManagementPdpComponent: [
						{
							type: RightsManagementPdpComponentType.Service
						}
					],
					rightsManagementPipComponent: [
						{
							type: RightsManagementPipComponentType.Service
						}
					],
					rightsManagementPxpComponent: [
						{
							type: RightsManagementPxpComponentType.Service
						}
					],
					rightsManagementPmpComponent: [
						{
							type: RightsManagementPmpComponentType.Service
						}
					],
					rightsManagementPnpComponent: [
						{
							type: RightsManagementPnpComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					rightsManagementPnapComponent: [
						{
							type: RightsManagementPnapComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					rightsManagementPolicyArbiterComponent: [
						{
							type: RightsManagementPolicyArbiterComponentType.PassThrough
						}
					],
					rightsManagementPolicyObligationEnforcerComponent: [
						{
							type: RightsManagementPolicyObligationEnforcerComponentType.PassThrough
						}
					],
					rightsManagementPolicyEnforcementProcessorComponent: [
						{
							type: RightsManagementPolicyEnforcementProcessorComponentType.PassThrough
						}
					],
					rightsManagementPolicyExecutionActionComponent: [
						{
							type: RightsManagementPolicyExecutionActionComponentType.Logging
						}
					],
					rightsManagementPolicyInformationSourceComponent: [
						{
							type: RightsManagementPolicyInformationSourceComponentType.Identity
						},
						{
							type: RightsManagementPolicyInformationSourceComponentType.Static
						}
					],
					rightsManagementPolicyNegotiatorComponent: [
						{
							type: RightsManagementPolicyNegotiatorComponentType.PassThrough
						}
					],
					rightsManagementPolicyRequesterComponent: [
						{
							type: RightsManagementPolicyRequesterComponentType.PassThrough
						}
					],
					taskSchedulerComponent: [
						{
							type: TaskSchedulerComponentType.Service
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					dataspaceControlPlaneComponent: [
						{
							type: DataspaceControlPlaneComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					dataspaceDataPlaneComponent: [
						{
							type: DataspaceDataPlaneComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						},
						{
							type: DataspaceDataPlaneComponentType.SocketClient,
							options: { config: { endpoint: "http://localhost:3000" } }
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});

		engine.addContextId(ContextIdKeys.Node, "did:iota:0x123");

		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"engine-logging-service",
			"schema-version-service",
			"platform-service",
			"logging-rest-client",
			"background-task-service",
			"task-scheduler-service",
			"event-bus-socket-client",
			"telemetry-rest-client",
			"metrics-collector-service",
			"automation-service",
			"messaging-admin-service",
			"messaging-service",
			"blob-storage-rest-client",
			"identity-rest-client",
			"identity-resolver-rest-client",
			"identity-profile-rest-client",
			"nft-rest-client",
			"immutable-proof-rest-client",
			"attestation-rest-client",
			"auditable-item-graph-rest-client",
			"auditable-item-stream-rest-client",
			"data-processing-rest-client",
			"health-service",
			"document-management-rest-client",
			"trust-service",
			"policy-administration-point-rest-client",
			"policy-management-point-service",
			"policy-execution-point-service",
			"policy-information-point-service",
			"policy-decision-point-service",
			"policy-enforcement-point-service",
			"policy-negotiation-admin-point-rest-client",
			"policy-negotiation-point-rest-client",
			"federated-catalogue-rest-client",
			"dataspace-control-plane-rest-client",
			"dataspace-data-plane-rest-client",
			"dataspace-data-plane-socket-client"
		]);

		expect(EntitySchemaFactory.names().filter(n => !/V(\d)+$/.test(n))).toEqual([
			"SchemaVersion",
			"Tenant",
			"BackgroundTask",
			"ScheduledTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"AutomationActionEntry",
			"EmailEntry",
			"SmsEntry",
			"PushNotificationDeviceEntry",
			"PushNotificationMessageEntry",
			"TemplateEntry",
			"VaultKey",
			"VaultSecret",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft"
		]);

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();
	});

	test("SchemaVersionService writes version records for all registered schemas on first start", async () => {
		const engine = new Engine({
			config: {
				types: {
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					schemaVersionMigrationComponent: [{ type: SchemaVersionMigrationComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }]
				}
			}
		});

		await engine.start();
		await engine.stop();

		const versionConnector = EntityStorageConnectorFactory.get<
			IEntityStorageConnector<SchemaVersion>
		>(nameofKebabCase(SchemaVersion));
		const { entities } = await versionConnector.query();
		const rows = entities ?? [];

		expect(rows.some(r => r.schemaName === nameof<SchemaVersion>())).toBe(true);
		expect(rows.some(r => r.schemaName === "BackgroundTask")).toBe(true);
		expect(rows.every(r => r.version === 0)).toBe(true);
	});

	test("Can migrate a custom entity storage type from v0 to v1", async () => {
		// Register the v0 historical schema and the current v1 schema.
		EntitySchemaFactory.register(nameof<TestMigrationEntityV0>(), () =>
			EntitySchemaHelper.getSchema(TestMigrationEntityV0)
		);
		EntitySchemaFactory.register(nameof<TestMigrationEntity>(), () =>
			EntitySchemaHelper.getSchema(TestMigrationEntity)
		);

		// Register the migration override: rename legacyField → newField (string coercion),
		// rename score → tags (integer → array) and convert via transformEntityProperty.
		const migrationKey = `${nameof<TestMigrationEntity>()}_0_1`;
		SchemaMigrationFactory.register(migrationKey, () => ({
			renames: [
				{ from: "legacyField", to: "newField" },
				{ from: "score", to: "tags" }
			],
			transformEntityProperty: (from, to, value) => [`item:${value as number}`]
		}));

		// Capture console.info to verify migration log messages are emitted.
		// ConsoleLoggingConnector routes all ILogEntry objects through console[level],
		// so SchemaVersionService and MigrationHelper migration events appear here.
		const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});

		try {
			const engine = new Engine({
				config: {
					types: {
						entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
						entityStorageComponent: [
							{
								type: EntityStorageComponentType.Service,
								options: {
									entityStorageType: nameof<TestMigrationEntity>(),
									partitionContextIds: []
								}
							}
						],
						schemaVersionMigrationComponent: [
							{ type: SchemaVersionMigrationComponentType.Service }
						],
						backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }]
					}
				},
				customBootstrap: async () => {
					// Push three v0-shaped records directly into the internal store to bypass
					// schema validation (the v1 connector would reject missing newField/tags).
					const connector = EntityStorageConnectorFactory.get(nameofKebabCase(TestMigrationEntity));
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const raw = connector as any;
					raw._store.push(
						{ id: "entity-1", legacyField: "old-value-1", score: 1 },
						{ id: "entity-2", legacyField: "old-value-2", score: 2 },
						{ id: "entity-3", legacyField: "old-value-3", score: 3 }
					);
				}
			});

			await engine.start();
			await engine.stop();

			// SchemaVersion record must show the migration reached version 1.
			const versionConnector = EntityStorageConnectorFactory.get<
				IEntityStorageConnector<SchemaVersion>
			>(nameofKebabCase(SchemaVersion));
			const { entities: versionRecords } = await versionConnector.query();
			const migrationRecord = (versionRecords ?? []).find(
				r => r.schemaName === nameof<TestMigrationEntity>()
			);
			expect(migrationRecord?.version).toBe(1);

			// All three entities must be migrated: legacyField renamed to newField,
			// score transformed into a tags array via transformEntityProperty.
			const entityConnector = EntityStorageConnectorFactory.get(
				nameofKebabCase(TestMigrationEntity)
			);
			const { entities } = await entityConnector.query();
			expect(entities).toHaveLength(3);
			const sorted = (
				[...(entities ?? [])] as (TestMigrationEntity & TestMigrationEntityV0)[]
			).sort((a, b) => a.id.localeCompare(b.id));
			for (const [i, item] of sorted.entries()) {
				const n = i + 1;
				expect(item.id).toBe(`entity-${n}`);
				expect(item.newField).toBe(`old-value-${n}`);
				expect(item.tags).toEqual([`item:${n}`]);
				expect(item.legacyField).toBeUndefined();
				expect(item.score).toBeUndefined();
			}

			// Console log entries from SchemaVersionService and MigrationHelper confirm the
			// migration lifecycle was logged.  Messages are not I18n-translated here because
			// entity-storage-service locales are not loaded in this test, so the raw keys appear.
			const allLogArgs = consoleSpy.mock.calls.flat().map(String);
			// SchemaVersionService: migration decision
			expect(allLogArgs.some(a => a.includes("migrationRequired"))).toBe(true);
			// MigrationHelper chain lifecycle
			expect(allLogArgs.some(a => a.includes("migrateSchemaStarting"))).toBe(true);
			// SchemaVersionService onProgress: partition-level events
			expect(allLogArgs.some(a => a.includes("partitionStart"))).toBe(true);
			expect(allLogArgs.some(a => a.includes("partitionProgress"))).toBe(true);
			// SchemaVersionService onProgress: item-level events
			expect(allLogArgs.some(a => a.includes("partitionItemsStart"))).toBe(true);
			expect(allLogArgs.some(a => a.includes("partitionItemsProgress"))).toBe(true);
			expect(allLogArgs.some(a => a.includes("partitionItemsEnd"))).toBe(true);
			expect(allLogArgs.some(a => a.includes("partitionEnd"))).toBe(true);
			// ConsoleLoggingConnector serialises ILogEntry.data as JSON; verify that the
			// item-level progress events report the correct entity count (3).
			// partitionItemsProgress fires with (itemTotal=3, itemIndex=3) after the single batch,
			// partitionItemsEnd fires with (itemTotal=3, itemIndex=3) after the loop.
			const ENTITY_COUNT = 3;
			const itemsEndCall = consoleSpy.mock.calls.find(args =>
				args.some(a => String(a).includes("partitionItemsEnd"))
			);
			expect(itemsEndCall).toBeDefined();
			expect(itemsEndCall?.some(a => String(a).includes(`"itemTotal":${ENTITY_COUNT}`))).toBe(true);
			const itemsProgressCall = consoleSpy.mock.calls.find(args =>
				args.some(a => String(a).includes("partitionItemsProgress"))
			);
			expect(itemsProgressCall).toBeDefined();
			expect(itemsProgressCall?.some(a => String(a).includes(`"itemIndex":${ENTITY_COUNT}`))).toBe(
				true
			);
			// MigrationHelper finalizing and completion
			expect(allLogArgs.some(a => a.includes("migrateSchemaFinalizing"))).toBe(true);
			expect(allLogArgs.some(a => a.includes("migrateSchemaComplete"))).toBe(true);
		} finally {
			consoleSpy.mockRestore();
			try {
				SchemaMigrationFactory.unregister(migrationKey);
			} catch {
				// Ignore if already removed.
			}
		}
	});
});
