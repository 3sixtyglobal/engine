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
	NftComponentType,
	NftConnectorType,
	NotarizationComponentType,
	NotarizationConnectorType,
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
	SynchronisedStorageComponentType,
	TaskSchedulerComponentType,
	TelemetryComponentType,
	TelemetryConnectorType,
	TrustComponentType,
	TrustGeneratorComponentType,
	TrustVerifierComponentType,
	UrlTransformerComponentType,
	VaultConnectorType,
	VerifiableStorageComponentType,
	VerifiableStorageConnectorType,
	WalletConnectorType
} from "@twin.org/engine-types";
import typeLocales from "@twin.org/engine-types/locales/en.json" with { type: "json" };
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageComponent
} from "@twin.org/entity-storage-models";
import { FederatedCatalogueFilterFactory } from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";
import {
	PolicyArbiterFactory,
	PolicyEnforcementProcessorFactory,
	PolicyExecutionActionFactory,
	PolicyInformationSourceFactory,
	PolicyNegotiatorFactory,
	PolicyRequesterFactory
} from "@twin.org/rights-management-models";
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

describe("engine", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", { ...coreLocales, ...typeLocales });

		ContextIdStore.getContextIds = vi.fn().mockImplementation(() => ({ node: "did:iota:0x123" }));
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
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [{ type: LoggingComponentType.Service }],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [{ type: TelemetryComponentType.Service }],
					automationComponent: [{ type: AutomationComponentType.Service }],
					automationAction: [
						{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
					],
					healthComponent: [{ type: HealthComponentType.Service }],
					urlTransformerComponent: [{ type: UrlTransformerComponentType.Service }],
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
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
					synchronisedStorageComponent: [
						{
							type: SynchronisedStorageComponentType.Service,
							options: { config: { verifiableStorageKeyId: "testnet" } }
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
							type: FederatedCatalogueFilterComponentType.FilterByExample,
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

		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"engine-logging-service",
			"logging-service",
			"background-task-service",
			"task-scheduler-service",
			"event-bus-service",
			"telemetry-service",
			"automation-service",
			"messaging-admin-service",
			"messaging-service",
			"blob-storage-service",
			"verifiable-storage-service",
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
			"url-transformer-service",
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
			"synchronised-storage-service",
			"federated-catalogue-service",
			"dataspace-control-plane-service",
			"dataspace-data-plane-service"
		]);

		expect(EntitySchemaFactory.names()).toEqual([
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
			"VerifiableItem",
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
			"SyncSnapshotEntry",
			"Dataset",
			"TransferProcess",
			"ActivityLogDetails",
			"ActivityTask"
		]);

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();

		expect(FederatedCatalogueFilterFactory.names()).toEqual(["FilterByExample"]);

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
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [{ type: TelemetryComponentType.Service }],
					automationComponent: [{ type: AutomationComponentType.Service }],
					automationAction: [
						{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
					],
					healthComponent: [{ type: HealthComponentType.Service }],
					urlTransformerComponent: [{ type: UrlTransformerComponentType.Service }],
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
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
					synchronisedStorageComponent: [
						{
							type: SynchronisedStorageComponentType.Service,
							options: { config: { verifiableStorageKeyId: "testnet" } }
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
							type: FederatedCatalogueFilterComponentType.FilterByExample,
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

		await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData);

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
				loggingConnector: [{ type: LoggingConnectorType.Console }],
				loggingComponent: [{ type: LoggingComponentType.Service }],
				entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
				blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
				blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
				backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
				eventBusConnector: [{ type: EventBusConnectorType.Local }],
				eventBusComponent: [{ type: EventBusComponentType.Service }],
				telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
				telemetryComponent: [{ type: TelemetryComponentType.Service }],
				automationComponent: [{ type: AutomationComponentType.Service }],
				automationAction: [
					{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
				],
				healthComponent: [{ type: HealthComponentType.Service }],
				urlTransformerComponent: [{ type: UrlTransformerComponentType.Service }],
				messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
				messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
				messagingPushNotificationConnector: [
					{ type: MessagingPushNotificationConnectorType.EntityStorage }
				],
				messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
				messagingComponent: [{ type: MessagingComponentType.Service }],
				vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
				verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
				verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
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
				synchronisedStorageComponent: [
					{
						type: SynchronisedStorageComponentType.Service,
						options: { config: { verifiableStorageKeyId: "testnet" } }
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
						type: FederatedCatalogueFilterComponentType.FilterByExample,
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

		await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData, {}, true);
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
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					automationComponent: [{ type: AutomationComponentType.Service }],
					automationAction: [
						{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
					],
					healthComponent: [{ type: HealthComponentType.Service }],
					urlTransformerComponent: [{ type: UrlTransformerComponentType.Service }],
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
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [
						{
							type: VerifiableStorageComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
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
					synchronisedStorageComponent: [
						{
							type: SynchronisedStorageComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
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

		await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"engine-logging-service",
			"logging-rest-client",
			"background-task-service",
			"task-scheduler-service",
			"event-bus-socket-client",
			"telemetry-rest-client",
			"automation-service",
			"messaging-admin-service",
			"messaging-service",
			"blob-storage-rest-client",
			"verifiable-storage-rest-client",
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
			"url-transformer-service",
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
			"synchronised-storage-rest-client",
			"federated-catalogue-rest-client",
			"dataspace-control-plane-rest-client",
			"dataspace-data-plane-rest-client",
			"dataspace-data-plane-socket-client"
		]);

		expect(EntitySchemaFactory.names()).toEqual([
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
			"VerifiableItem",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft"
		]);

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();
	});

	test("Can use a custom entity storage connector type", async () => {
		const engine = new Engine({
			config: {
				types: {
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					entityStorageConnector: [
						{ type: EntityStorageConnectorType.Memory },
						{
							type: EntityStorageConnectorType.Synchronised,
							options: {
								entityStorageConnectorType: "memory"
							}
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: {
								datasetEntityStorageType: "synchronised"
							}
						}
					]
				}
			}
		});

		await engine.start();
		await engine.stop();

		expect(EntityStorageConnectorFactory.get("synchronised").constructor.name).toEqual(
			"SynchronisedEntityStorageConnector"
		);

		const federatedCatalogueService = ComponentFactory.get("federated-catalogue-service");
		expect(federatedCatalogueService).toBeDefined();
	});

	test("Can override and use a custom entity storage connector type", async () => {
		const engine = new Engine({
			config: {
				types: {
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					entityStorageConnector: [
						{ type: EntityStorageConnectorType.Memory },
						{
							type: EntityStorageConnectorType.Synchronised,
							overrideInstanceType: "custom-dataset-storage",
							options: {
								entityStorageConnectorType: "memory"
							}
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: {
								datasetEntityStorageType: "custom-dataset-storage"
							}
						}
					]
				}
			}
		});

		await engine.start();
		await engine.stop();

		expect(EntityStorageConnectorFactory.get("custom-dataset-storage").constructor.name).toEqual(
			"SynchronisedEntityStorageConnector"
		);

		const federatedCatalogueService = ComponentFactory.get("federated-catalogue-service");
		expect(federatedCatalogueService).toBeDefined();
	});
});
